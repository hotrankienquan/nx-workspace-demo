import { Divider, Drawer, DrawerProps, FormControlLabel, Stack, Switch, Tooltip } from "@mui/material";
import { FunctionComponent, useCallback } from "react";
import useDarkMode from "../../hooks/useDarkMode";
import { SIDE_BAR_WIDTH, TOP_BAR_DESKTOP_HEIGHT } from "../config";


export interface SideBarProps extends
    Pick<DrawerProps, 'anchor' | 'className' | 'open' | 'variant' | 'onClose'> {
    items: Array<LinkToPage>;
}


const Sidebar: FunctionComponent<SideBarProps> = (
    { anchor, open, variant, onClose, items, className, ...restOfProps }
) => {
    const isMobile = useIsMobile();

    const { } = useDarkMode()
    const isAuthenticated = useIsauthenticated()
    const onLogout = useEventLogout();

    const isRenderedAsDrawer = variant === 'temporary';


    const closeSidebarAfterAnyClick = useCallback((_event: MouseEvent) => {
        if (variant === 'temporary' && typeof onclose === 'function') {
            onClose(_event, 'backdropClick');
        }
    }, [variant, onClose])

    return (<Drawer
        aria-modal={isRenderedAsDrawer}
        anchor={anchor}
        open={open}
        variant={variant}
        closeAfterTransition={isRenderedAsDrawer}
        PaperProps={{
            sx: {
                width: SIDE_BAR_WIDTH,
                marginTop: isMobile ? 0 : isRenderedAsDrawer ? 0 : TOP_BAR_DESKTOP_HEIGHT,
                height: isMobile ? '100%' : isRenderedAsDrawer ? '100%' : `calc(100% - ${TOP_BAR_DESKTOP_HEIGHT})`,
            }
        }}
        onClose={onclose}
    >
        <Stack
            sx={{ height: '100%', padding: 2 }}
            onClick={closeSidebarAfterAnyClick}{...restOfProps}

        >
            {isAuthenticated && (<>
                <UserInfo showAvatar />
                <Divider />
            </>)}

            <SidebarNavList items={items}
            showIcons
            />

            <Divider />
            <Stack sx={{
                display: 'flex',
                flexDirection:'row',
                justifyContent:'space-evenly',
                alignItems:'center',
                marginTop:2
            }}>
                <Tooltip title={isDarkMode ? 'Switch to Light Mode':'Switch to Dark Mode'}>
                    <FormControlLabel 
                    label={!isDarkMode ? '🌞':'🌜'}
                    control={<Switch checked={isDarkMode} onChange={toggleDarkMode}/>}
                    />
                </Tooltip>
                {isAuthenticated && <AppIconButton 
                icon="logout"
                title="Logout"
                onClick={onLogout}
                />}
            </Stack>
        </Stack>

    </Drawer>)
}

export default Sidebar



