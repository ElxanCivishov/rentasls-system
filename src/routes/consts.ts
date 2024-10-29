import { ROLE_KEYWORDS, TRolesKeyword } from "@/models/Roles";

export const ROUTES = {
    DASHBOARD: {
        PATH: "/",
        LINK: "/",
        ROLES: [],
    },

    STATISTICS: {
        ROUTE: "statistics",
        PATH: "statistics",
        LINK: "/statistics",
        ROLES: [],
        STATISTIC: { ROUTE: "statistic/:company", LINK: "/statistic/", PATH: "statistic", ROLES: [] },
    },

    USERS: {
        PATH: "users",
        LINK: "/users",
        ROLES: [ROLE_KEYWORDS.ADMIN],
    },

    MAP: {
        PATH: "map",
        ROUTE: "map/:building/:company",
        LINK: "/map/",
        ROLES: [],
    },

    ROOMS: {
        PATH: "rooms",
        ROUTE: "rooms/:building/:company",
        LINK: "/rooms/",
        ROLES: [],
    },

    AUTH: {
        PATH: "auth",
        ROUTE: "auth",
        LINK: "/auth",
        ROLES: [],
        LOGIN: { ROUTE: "login", LINK: "/login", PATH: "login", ROLES: [] },
        LOGOUT: { ROUTE: "logout", LINK: "/logout", PATH: "logout", ROLES: [] },
        UNAUTHORIZED: { ROUTE: "unauthorized", LINK: "/unauthorized", PATH: "unauthorized", ROLES: [] },
    },

    ERROR_PAGE: { ROUTE: "error", LINK: "/error", PATH: "error", ROLES: [] },
};

export type RouteConfig = {
    PATH: string;
    LINK: string;
    ROUTE?: string;
    BREADCRUMB?: string;
    ROLES: TRolesKeyword[];
    checkAuth?: boolean;
    [key: string]: any;
};

export type Routes = {
    [key: string]: RouteConfig;
};
