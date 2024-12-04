import PrivateRoutes from "@/components/PrivateRoutes";
import Search from "@/pages/Search/Search";
import Layout from "@/partials/Layout";
import { lazy } from "react";
import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Dashboard from "../pages/Buildings";
import { NotFound } from "../partials/NotFound";
import { Unauthorized } from "../partials/Unauthorized";
import { ROUTES } from "./consts";

export const Login = lazy(() => import("../pages/Login/index"));
export const Statistics = lazy(() => import("../pages/Statistics"));
export const Statistic = lazy(() => import("../pages/Statistics/Statistic"));
export const Users = lazy(() => import("../pages/Users"));
export const Maps = lazy(() => import("../pages/Map"));
export const Rooms = lazy(() => import("../pages/Rooms"));

// eslint-disable-next-line
export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path={ROUTES.DASHBOARD.PATH} element={<Outlet />}>
            <Route path={ROUTES.DASHBOARD.PATH} element={<PrivateRoutes Component={<Layout />} roles={[]} />}>
                <Route
                    path={ROUTES.DASHBOARD.PATH}
                    handle={{ breadCrumb: "Idarə paneli" }}
                    element={<PrivateRoutes Component={<Dashboard />} roles={ROUTES.DASHBOARD.ROLES} />}
                />
                <Route path={ROUTES.SEARCH.ROUTE} handle={{ breadCrumb: "Axtarış" }} element={<Search />} />
                <Route
                    path={ROUTES.DASHBOARD.TERRITORY.ROUTE}
                    handle={{ breadCrumb: "Ərazi" }}
                    element={<PrivateRoutes Component={<Dashboard />} roles={ROUTES.DASHBOARD.TERRITORY.ROLES} />}
                />
                <Route
                    path={ROUTES.STATISTICS.ROUTE}
                    handle={{ breadCrumb: "Statistika" }}
                    element={<PrivateRoutes Component={<Statistics />} roles={ROUTES.STATISTICS.ROLES} />}
                />
                <Route
                    path={ROUTES.STATISTICS.STATISTIC.ROUTE}
                    handle={{ breadCrumb: "Statistika" }}
                    element={<PrivateRoutes Component={<Statistic />} roles={ROUTES.STATISTICS.STATISTIC.ROLES} />}
                />
                <Route
                    path={ROUTES.USERS.PATH}
                    handle={{ breadCrumb: "İstifadəçilər" }}
                    element={<PrivateRoutes Component={<Users />} roles={ROUTES.USERS.ROLES} />}
                />
                <Route
                    path={ROUTES.MAP.ROUTE}
                    handle={{ breadCrumb: "Xəritə" }}
                    element={<PrivateRoutes Component={<Maps />} roles={ROUTES.MAP.ROLES} />}
                />
                <Route
                    path={ROUTES.ROOMS.ROUTE}
                    handle={{ breadCrumb: "Otaqlar" }}
                    index
                    element={<PrivateRoutes Component={<Rooms />} roles={ROUTES.ROOMS.ROLES} />}
                />
            </Route>
            ,
            <Route handle={{ breadCrumb: "Icazəsiz giriş" }} path={ROUTES.AUTH.UNAUTHORIZED.ROUTE} element={<Unauthorized />} />,
            <Route handle={{ breadCrumb: "Daxil olun" }} path={ROUTES.AUTH.LOGIN.ROUTE} element={<Login />} />,
            <Route path='*' element={<NotFound />} />
        </Route>,
    ),
);

export type RouteProps = {
    breadCrumb: string;
    disabled?: boolean;
};
