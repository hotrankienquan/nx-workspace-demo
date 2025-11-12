import { Box, Breadcrumbs, Card, CardContent, Link, Typography, CircularProgress, Alert } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useEffect, useState } from 'react';

// --- Interfaces for data modeling ---

interface Claim {
    id: string;
    category: 'Motor' | 'Casualty' | 'Property';
    title: string;
    description: string;
}

type CategoryType = 'Motor' | 'Casualty' | 'Property' | null;

interface ClaimsStore {
    claims: Claim[] | null;
    loading: boolean;
    error: string | null;
    activeCategory: CategoryType;
    // Add a dispatch function to change the active category
    setActiveCategory: (category: CategoryType) => void;
}

const API_CLAIMS_URL = 'https://new-ui/api/claims';

// --- Mock Service Worker Handlers (for context, not part of this file) ---
// Reminder: Your handler returns the array directly, not an object { data: [...] }

/*
// handlers.ts (Context/Reference)
export const handlers = [
  http.get('https://new-ui/api/claims', ({request}) => {
    // ... handler logic returns array
    return HttpResponse.json(MOCK_CLAIMS_DATA or filteredClaims, {status:200})
  })
]
*/

// --- State Management Hook (Replaced with a centralized hook) ---

const useClaimsStore = () => {
    const [state, setState] = useState<Omit<ClaimsStore, 'setActiveCategory'>>({
        claims: null,
        loading: false,
        error: null,
        activeCategory: 'Motor', // Default to Motor category
    });

    // Function to change the active category (used by SidebarInstruct)
    const setActiveCategory = (category: CategoryType) => {
        setState(prev => ({ ...prev, activeCategory: category }));
    }

    const claimsFetcher = async (category: CategoryType) => {
        if (!category) return;

        setState(prev => ({ ...prev, loading: true, error: null }));
        const url = new URL(API_CLAIMS_URL);
        
        // Append the category filter to the URL
        if (category) {
            url.searchParams.set("category", category);
        }

        try {
            const resp = await fetch(url.toString());
            console.log("data mock response", resp)
            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }

            // --- FIX 1: Read the response body directly as an array ---
            // The MSW handler returns an array directly, so we read it directly.
            const data: Claim[] = await resp.json();
            
            // --- FIX 2: Check for empty data response ---
            if (data.length === 0) {
                 setState(prev => ({ 
                    ...prev, 
                    claims: [], 
                    loading: false 
                }));
                return;
            }

            setState(prev => ({ 
                ...prev, 
                claims: data, 
                loading: false 
            }));

        } catch (err: any) {
            // --- FIX 3: Catch network and parsing errors ---
            console.error("Fetch failed:", err);
            setState(prev => ({ 
                ...prev, 
                error: `Error fetching claims. MSW may not be running. Details: ${err.message}`, 
                loading: false 
            }));
        }
    };

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            const { worker } = require('../__mocks__/libs/browser-worker');
            worker.start({
                serviceWorker: {
                    url: '/mockServiceWorker.js', // Ensure this path matches the location of the file
                },
            });
        }
        claimsFetcher(state.activeCategory);
    }, [state.activeCategory]);

    return { ...state, setActiveCategory };
};

// --- Dummy Placeholder for SidebarInstruct to make ContentInstruct runnable ---
// NOTE: You must manage the state centrally and pass down the setActiveCategory function to your real SidebarInstruct.
const SidebarInstruct = ({ setActiveCategory }: { setActiveCategory: (c: CategoryType) => void }) => {
    return (
        <Box sx={{ width: 180, p: 2, height: '100%', borderRight: '1px solid #e0e0e0', bgcolor: '#fff', marginTop:'5rem'}}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Categories</Typography>
            {['Motor', 'Casualty', 'Property'].map((cat) => (
                <Link key={cat} onClick={() => setActiveCategory(cat as CategoryType)} sx={{ cursor: 'pointer', display: 'block', py: 0.5 }}>
                    {cat}
                </Link>
            ))}
        </Box>
    )
}

// --- Main Content Component ---

const ContentInstruct = () => {
    // Use the custom state hook
    const { claims, loading, error, activeCategory, setActiveCategory } = useClaimsStore();

    // --- Content Loading/Error/Empty State ---
    const renderContent = () => {
        if (loading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Loading claims for {activeCategory}...</Typography>
                </Box>
            );
        }

        if (error) {
            return (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            );
        }

        if (!claims || claims.length === 0) {
             // Handle the MSW case where Casualty returns an empty array
            return (
                <Alert severity="info" sx={{ mt: 2 }}>
                    No instructions found for the category: {activeCategory}.
                </Alert>
            );
        }

        // --- Render Claims Cards ---
        return (
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                {claims.map((c) => (
                    <Card key={c.id} sx={{ width: 300, minHeight: 200, display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2 }}>
                        <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                            <Box sx={{ backgroundColor: '#e0f7fa', borderRadius: 1, p: 2, mb: 2 }}>
                                <DirectionsCarIcon sx={{ fontSize: 40, color: '#00bcd4' }} />
                            </Box>
                            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                                {c.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {c.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        );
    };

    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            
            {/* Left Sidebar for Categories (This should ideally be in the parent layout) */}
            {/* Placing it here temporarily for visualization, but removing it from the main flex container below */}
            <SidebarInstruct setActiveCategory={setActiveCategory} />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#f5f5f5',
                    p: 3,
                    pt: '80px', // Offset for App Bar
                    overflowY: 'auto',
                    width: 'calc(100% - 180px)' // Adjust for sidebar
                }}
            >
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Typography color="text.primary">New Instructions</Typography>
                </Breadcrumbs>

                <Typography variant="h5" gutterBottom sx={{ mt: 2, mb: 4, fontWeight: 'bold' }}>
                    New Instructions ({activeCategory})
                </Typography>

                {renderContent()}

            </Box>
        </Box>
    );
};

export default ContentInstruct;