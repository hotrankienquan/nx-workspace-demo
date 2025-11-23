import { FunctionComponent, PropsWithChildren } from "react";
import { BOTTOM_BAR_DESKTOP_VISIBLE } from "./config";
import { Stack } from "@mui/material";



const TITLE_PUBLIC = 'Unauthorized - _TITLE_';

const SIDE_BAR_ITEMS: Array<LinkToPage> = [
    {
        title: 'Log In',
        path: '/auth/login',
        icon: 'login',
    },
    {
        title: 'Sign Up',
        path: '/auth/signup',
        icon: 'signup',
    },
    {
        title: 'About',
        path: '/about',
        icon: 'info',
    },
]

IS_DEBUG &&
    SIDE_BAR_ITEMS.push({
        title: '[Debug Tools]',
        path: '/dev',
        icon: 'settings',
    });


const BOTTOM_BAR_ITEMS: Array<LinkToPage> = [
    {
        title: 'Log In',
        path: '/auth/login',
        icon: 'login',
    },
    {
        title: 'Sign Up',
        path: '/auth/signup',
        icon: 'signup',
    },
    {
        title: 'About',
        path: '/about',
        icon: 'info',
    },
];


const PublicLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const onMobile = useIsMobile()

    const bottomBarVisible = onMobile || BOTTOM_BAR_DESKTOP_VISIBLE;

    const title = TITLE_PUBLIC;
    document.title = title;

    return (<TopBarAndSideBarLayout
        sidebarItems={SIDE_BAR_ITEMS}
        title={title}
        variant="sidebarAlwaysTemporary"

    >
        {children}
        <Stack component="footer">
            {bottomBarVisible && (
                <BottomBar
                    items={BOTTOM_BAR_ITEMS}
                />
            )}
        </Stack>
    </TopBarAndSideBarLayout>)

}

export default PublicLayout;


