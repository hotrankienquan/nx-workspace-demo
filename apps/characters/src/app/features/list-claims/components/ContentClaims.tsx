import { Alert, Box, Breadcrumbs, Card, CardContent, CircularProgress, Link, Typography, useTheme } from '@mui/material'
import { ContentClaimsProps } from '../types/interface/list-claims';
import { DETAIL_CLAIMS_PATH } from '../utils/constants';
import { Link as RouterDomLink } from 'react-router-dom'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const ContentClaims = ({ loading, activeCategory, claims, error }: ContentClaimsProps) => {
    const theme = useTheme();
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
            <Alert severity="info" sx={{ mt: 2 }}>No instructions found for the category: {activeCategory}.
            </Alert>
        );
    }

    return (
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

            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                {claims.map((c) => (
                    <Card key={c.id} sx={{ width: 300, minHeight: 200, display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2 }}>
                        <RouterDomLink to={`${DETAIL_CLAIMS_PATH}/${c.id}`} className='no-underline'>
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
        </Box>
    )
}

export default ContentClaims