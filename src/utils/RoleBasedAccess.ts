import { TRolesKeyword } from "@/models/Roles";
import { Routes } from "@/routes/consts";

/**
 * Check if user role is authorized for a specific route
 * @param userRoles - Roles assigned to the user *
 * @param checkAuth - Whether the route requires authentication
 * @param routeRoles - Roles allowed to access the route
 * @returns True if user has access, else false
 */
export const isUserAuthorized = ({
    userRoles,
    routeRoles,
    checkAuth = true,
}: {
    userRoles: TRolesKeyword[];
    routeRoles: TRolesKeyword[];
    checkAuth?: boolean;
}): boolean => {
    if (!checkAuth || routeRoles.length === 0) {
        return true;
    }

    return routeRoles.some((role) => userRoles.includes(role));
};

/**
 * Get accessible routes based on user roles
 * This function recursively flattens and filters routes based on the user's roles.
 * @param  userRoles - Roles assigned to the user
 * @param  withChildRoute - If true, includes the full route object; if false, includes a simplified version
 * @param  parentKey -  The key for the parent route, used for generating unique route keys
 * @param routes - All defined routes
 * @returns Routes accessible by the user
 *
 */

type TGetAccessibleRoutesProps = {
    routes: Routes;
    parentKey?: string;
    userRoles?: TRolesKeyword[];
};

export const getAccessibleRoutes = ({ routes = {}, parentKey = "", userRoles = [] }: TGetAccessibleRoutesProps): Routes => {
    const result: Routes = {};

    const flatten = (routesObj: Routes, parentKey: string) => {
        Object.keys(routesObj).forEach((key) => {
            const currentKey = parentKey ? `${parentKey}_${key}` : key;
            const route = routesObj[key];

            const isAuthorized = isUserAuthorized({ userRoles, routeRoles: route.ROLES, checkAuth: route?.checkAuth });
            if (isAuthorized) {
                result[currentKey] = {
                    ROUTE: route.ROUTE,
                    PATH: route.PATH,
                    LINK: route.LINK,
                    ROLES: route.ROLES,
                };

                Object.keys(route).forEach((subKey) => {
                    if (typeof route[subKey] === "object" && route[subKey]?.LINK) {
                        flatten({ [subKey]: route[subKey] }, currentKey);
                    }
                });
            }
        });
    };

    flatten(routes, parentKey);

    return result;
};

/**
 * Check if a given pathname is accessible based on user roles
 * @param pathname - The current pathname
 * @param accessibleRoutes - Roles accessible to the user
 * @returns True if the pathname is accessible, else false
 */
export const isPathnameAccessible = ({ pathname, accessibleRoutes }: { pathname: string; accessibleRoutes: Routes }): boolean => {
    return Object.values(accessibleRoutes).some((route) => route.LINK === pathname);
};
