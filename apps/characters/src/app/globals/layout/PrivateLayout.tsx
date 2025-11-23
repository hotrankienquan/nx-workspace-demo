import { FunctionComponent, PropsWithChildren } from "react";



const TITLE_PRIVATE= '_TITLE_';

const SIDE_BAR_ITEMS:Array<LinkToPage> = [
    {
        title:'Home',
        path:'/',
        icon:'home'
    },
    {
        title:'My Profile',
        path:'/me',
        icon:'account'
    }
];


IS_DEBUG && SIDE_BAR_ITEMS.push({
    title:'[Debug Tools]',
    path:'/dev',
    icon:'settings'
});

///Renders 'Private Layout'

const PrivateLayout:FunctionComponent<PropsWithChildren> = (
    {children}
) => {
    const title = TITLE_PRIVATE;

    document.title = title;

    return(<TopBarAndSideBarLayout
    sidebarItems={SIDE_BAR_ITEMS}
    title={title}
    variant="sidebarPersistentOnDesktop"
    >
        {children}

    </TopBarAndSideBarLayout>)
}

export default PrivateLayout;


