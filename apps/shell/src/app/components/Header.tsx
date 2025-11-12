import { AppBar, Icon, Toolbar, Typography } from '@mui/material'
import QrCodeIcon from '@mui/icons-material/QrCode';


import { drawerWidth } from '../constants/constants'


const AppBarStyles = {
    width: `calc(100% - ${drawerWidth}px)`,
    ml: `${drawerWidth}px`,
    backgroundColor: '#fff',
    boxShadow: 'none',
    borderBottom: '1px solid #e0e0e0',
}
const Header = () => {
    return (
            <AppBar
                position="fixed"
                sx={AppBarStyles}
            >
                <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px!important' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#333' }}/>
                    <Icon sx={{ color: 'green', fontSize: 30 }}><QrCodeIcon /></Icon>
                </Toolbar>
            </AppBar>
    )
}

export default Header