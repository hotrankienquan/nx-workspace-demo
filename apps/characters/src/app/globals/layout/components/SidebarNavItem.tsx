import { FunctionComponent, MouseEventHandler } from "react";


interface Props extends LinkToPage{
    openInNewTab?: boolean;
    selected?: boolean;
    onClick?:MouseEventHandler;

}



const SidebarNavItem:FunctionComponent<Props> =({
    openInNewTab,
    icon,
    path,
    selected: propSelected = false,
    subtitle,
    title,
    onClick
}) => {
    
}