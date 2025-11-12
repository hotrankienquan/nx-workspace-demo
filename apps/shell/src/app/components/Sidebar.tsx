// Sidebar.jsx (updated)

import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom'; // 👈 Import Link

import { drawerWidth } from '../constants/constants';

// 1. Define the sidebar items with their icons and paths
const sidebarItems = [
    { text: 'Instructions', icon: HomeIcon, path: '/remote1/abc' },
    { text: 'Profile', icon: PersonIcon, path: '/profile' },
    { text: 'Stats', icon: BarChartIcon, path: '/stats' },
    { text: 'Location', icon: LocationOnIcon, path: '/location' },
    { text: 'Trash', icon: DeleteIcon, path: '/trash' },
    { text: 'Documents', icon: DescriptionIcon, path: '/documents' },
];

const Sidebar = () => {
    // You might use useLocation() here to get the current path and handle active styling
    // const { pathname } = useLocation();

    return (
        <Box
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                // ... (rest of your container styles)
                borderRight: '1px solid #e0e0e0',
                backgroundColor: '#fff',
                zIndex: 1200,
            }}
        >
            <Box sx={{ height: 64 }} />

            <List sx={{ pt: 0 }}>
                {sidebarItems.map((item, index) => {
                    const IconComponent = item.icon;
                    // Determine if the item is active (e.g., if index is 4 for 'Trash' as in your original code)
                    const isActive = index === 4; 
                    
                    return (
                        <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                component={Link} // 👈 Use Link component for navigation
                                to={item.path}   // 👈 Set the navigation destination
                                sx={{
                                    minHeight: 48,
                                    justifyContent: 'center',
                                    px: 2.5,
                                    flexDirection: 'column',
                                    '&:hover': { backgroundColor: '#e0f7fa' },
                                    backgroundColor: isActive ? '#e0f7fa' : 'transparent', // Highlight based on isActive
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: 'auto',
                                        justifyContent: 'center',
                                        color: isActive ? 'green' : '#757575',
                                    }}
                                >
                                    {/* Render the icon component */}
                                    <IconComponent /> 
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.text} 
                                    sx={{ opacity: 1, fontSize: 10, textAlign: 'center' }} 
                                    primaryTypographyProps={{ fontSize: 10, color: isActive ? 'green' : '#757575' }} 
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
}

export default Sidebar;