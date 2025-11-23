import { BottomNavigation, BottomNavigationAction } from "@mui/material"
import { FunctionComponent, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"


interface Props {
    items: Array<LinkToPage>
}



const BottomBar: FunctionComponent<Props> = ({ items }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const onNavigationChange = useCallback
        ((_event: unknown, newValue: string) => {
            navigate(newValue)
        }, [navigate])

    return (<BottomNavigation
        value={location.pathname}
        showLabels
        onChange={onNavigationChange}
    >
        {items.map((item) => (
            <BottomNavigationAction
                key={item.path}
                label={item.title}
                value={item.path}
                icon={item.icon && <AppIcon icon={item.icon} />}
            />))}
    </BottomNavigation>)
}