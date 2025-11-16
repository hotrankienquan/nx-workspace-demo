import { Box } from '@mui/material';
import { useClaimsStore } from '../../../features/list-claims/hooks/useClaimsStore';
import SidebarInstruct from '../../../features/list-claims/components/SidebarInstruct';
import ContentClaims from '../../../features/list-claims/components/ContentClaims';

const ListClaimsPage = () => {

    const { claims, loading, error, activeCategory, setActiveCategory } = useClaimsStore("Motor");
    console.log({ claims, loading, error, activeCategory });
    
    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            <SidebarInstruct setActiveCategory={setActiveCategory!!} />
            <ContentClaims 
                claims={claims} 
                loading={loading} 
                error={error} 
                activeCategory={activeCategory}
            />
        </Box>
    );
};
export default ListClaimsPage;