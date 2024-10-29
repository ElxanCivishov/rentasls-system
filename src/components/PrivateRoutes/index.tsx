import { useUser } from "@/hooks/useUser";
import { TRolesKeyword } from "@/models/Roles";
import { ROUTES } from "@/routes/consts";
import { isUserAuthorized } from "@/utils/RoleBasedAccess";
import { ReactNode, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { Loading } from "../CustomLoading";

const PrivateRoutes = ({ Component, roles: allowedRoles = [], forceAuth = true }: PrivateRoutesProps) => {
    const { user, userRoles, isLoading } = useUser();

    const isAuthorized = useMemo<boolean>(() => {
        return isUserAuthorized({ userRoles, routeRoles: allowedRoles, checkAuth: forceAuth });
    }, [allowedRoles, forceAuth, userRoles]);

    if (isLoading) return <Loading />;

    if (!user) return <Navigate to={ROUTES.AUTH.LOGIN.LINK} />;

    if (!isAuthorized) {
        return <Navigate to={ROUTES.AUTH.UNAUTHORIZED.LINK} replace={true} />;
    }

    return Component;
};

export default PrivateRoutes;

type PrivateRoutesProps = {
    Component: ReactNode;
    roles: TRolesKeyword[];
    forceAuth?: boolean;
};
