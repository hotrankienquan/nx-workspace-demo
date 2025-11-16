import { Outlet, Route, Routes } from "react-router-dom"
import { DETAIL_CLAIMS_PATH_ROUTE, LIST_CLAIMS_PATH_ROUTE } from "../../globals/paths/claims";
import ListClaimsPage from "../pages/list-claims/page";
import DetailClaimsPage from "../pages/detail-claims/page";

const RootRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route
                    path={LIST_CLAIMS_PATH_ROUTE}
                    element={<ListClaimsPage />}
                />
                <Route
                    path={DETAIL_CLAIMS_PATH_ROUTE}
                    element={<DetailClaimsPage />}
                />
            </Route>
        </Routes>
    )
}

export default RootRoute;