import { Box, Breadcrumbs, Card, CardContent, Link, Typography, CircularProgress, Alert, useTheme } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useClaimsStore } from '../hooks/useClaimsStore';
import SidebarInstruct from './SidebarInstruct';

import { Link as RouterDomLink } from 'react-router-dom'
import { DETAIL_CLAIMS } from '../utils/constants';

import './styles.css'

const ContentInstruct = () => {
    const { claims, loading, error, activeCategory, setActiveCategory } = useClaimsStore("Motor");
    console.log({ claims, loading, error, activeCategory });

    const theme = useTheme();

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
                    {error.message}
                </Alert>
            );
        }

        if (!claims || claims.length === 0) {
            return (
                <Alert severity="info" sx={{ mt: 2 }}>
                    No instructions found for the category: {activeCategory}.
                </Alert>
            );
        }

        return (
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                {claims.map((c) => (
                    <Card key={c.id} sx={{ width: 300, minHeight: 200, display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2 }}>
                        <RouterDomLink to={`${DETAIL_CLAIMS}/${c.id}`} className='no-underline'>
                            <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                                <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1, p: 2, mb: 2 }}>
                                    <DirectionsCarIcon sx={{ fontSize: 40, color: "text.secondary" }} />
                                </Box>
                                <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                                    {c.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {c.description}
                                </Typography>
                            </CardContent>
                        </RouterDomLink>
                    </Card>
                ))}
            </Box>
        );
    };

    return (
        <Box sx={{ display: 'flex', height: '100%' }}>

            <SidebarInstruct setActiveCategory={setActiveCategory!!} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: theme.palette.background.paper,
                    p: 3,
                    pt: 2,
                    overflowY: 'auto',
                    width: 'calc(100% - 180px)'
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