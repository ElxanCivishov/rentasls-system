import { ROLE_KEYWORDS, TRolesKeyword } from "@/models/Roles";
import { ROUTES } from "@/routes/consts";
import { AuthService } from "@/service/AuthService";
import { UserService } from "@/service/UserService";
import { getAccessibleRoutes } from "@/utils/RoleBasedAccess";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useUser() {
    const accessToken = AuthService.accessToken;

    const { data: user, ...rest } = useQuery({
        queryKey: ["user", accessToken],
        queryFn: UserService.getUser,
    });

    const userRoles = useMemo<TRolesKeyword[]>(() => {
        return [ROLE_KEYWORDS.ADMIN];
        if (!user) return [];
        // const roles = user.roles.map((role) => role.keyword);
        // const permissions = user.permissions.map((permission) => permission.keyword);
        // return [...roles, ...permissions];
    }, [user]);

    const accessibleRoutes = useMemo(() => getAccessibleRoutes({ userRoles, routes: ROUTES }), [userRoles]);

    const isAdmin = useMemo(() => adminEmails.includes(user?.email ?? ''), [user?.email]);
    
    return { user, userRoles, accessibleRoutes, isAdmin, ...rest };
}

const adminEmails = ["admin@azeraholding.az", "sabuhi.abdullayev@azeraholding.az"];
