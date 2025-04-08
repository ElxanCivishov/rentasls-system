import LogoutIcon from "@/assets/icons/LogoutIcon";
import Paper from "@/assets/icons/Paper";
import UsersIcon from "@/assets/icons/UsersIcon";
import { useUser } from "@/hooks/useUser";
import { ROUTES } from "@/routes/consts";
import { isPathnameAccessible } from "@/utils/RoleBasedAccess";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import "./CustomMenu.scss";

export function useAccessibleMenus(selectedItem: string) {
    const { accessibleRoutes } = useUser();

    const menuItems = useMemo(() => menus(selectedItem), [selectedItem]);

    const accessibleMenus: MenuItem[] = useMemo(() => {
        return menuItems
            .map((menu) => {
                const isMenuAccessible = isPathnameAccessible({ pathname: menu.key, accessibleRoutes });

                if (menu.children && menu.children.length > 0) {
                    const accessibleChildren = menu.children
                        .map((child) => {
                            const isChildAccessible = isPathnameAccessible({ pathname: child.key, accessibleRoutes });
                            return isChildAccessible ? child : null;
                        })
                        .filter(Boolean);

                    if (accessibleChildren.length > 0 || isMenuAccessible) {
                        return {
                            ...menu,
                            children: accessibleChildren,
                        };
                    }
                } else if (isMenuAccessible) {
                    return menu;
                }

                return null;
            })
            .filter(Boolean) as MenuItem[];
    }, [accessibleRoutes, menuItems]);

    return { accessibleMenus };
}

type MenuItem = {
    key: string;
    label: JSX.Element | string;
    icon?: JSX.Element;
    children?: MenuItem[];
};

const menus = (selectedItem: string): MenuItem[] => [
    {
        label: <Link to={ROUTES.DASHBOARD.LINK}>İdarə paneli</Link>,
        key: ROUTES.DASHBOARD.LINK,
        icon: (
            <div className='sidebar-icon'>
                <Paper selected={selectedItem === ROUTES.DASHBOARD.LINK} />
            </div>
        ),
    },
    {
        label: <Link to={ROUTES.STATISTICS.LINK}>Statistika</Link>,
        key: ROUTES.STATISTICS.LINK,
        icon: (
            <div className='sidebar-icon'>
                <Paper selected={selectedItem === ROUTES.STATISTICS.LINK} />
            </div>
        ),
    },
    {
        label: <Link to={ROUTES.USERS.LINK}>İstifadəçilər</Link>,
        key: ROUTES.USERS.LINK,
        icon: (
            <div className='sidebar-icon'>
                <UsersIcon selected={selectedItem === ROUTES.USERS.LINK} />
            </div>
        ),
    },
    // {
    //     label: <Link to={ROUTES.USER_MANUAL.LINK}>İstifadəçi təlimatı</Link>,
    //     key: ROUTES.USER_MANUAL.LINK,
    //     icon: (
    //         <div className='sidebar-icon'>
    //             <UsersIcon selected={selectedItem === ROUTES.USER_MANUAL.LINK} />
    //         </div>
    //     ),
    // },

    {
        label: "Çıxış edin",
        key: ROUTES.AUTH.LOGOUT.LINK,
        icon: (
            <div className='sidebar-icon'>
                <LogoutIcon selected={selectedItem === ROUTES.AUTH.LOGOUT.LINK} />
            </div>
        ),
    },
];
