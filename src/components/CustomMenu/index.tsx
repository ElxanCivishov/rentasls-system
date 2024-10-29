import { Button, Layout, Menu } from "antd";
import { useEffect, useState } from "react";

import MenuButton from "@/assets/icons/MenuButton.svg";
import Logo from "@/assets/logo.png";
import "./CustomMenu.scss";

import { APP_TITLE } from "@/models/Consts";
import { ROUTES } from "@/routes/consts";
import { AuthService } from "@/service/AuthService";
import { Link, useLocation } from "react-router-dom";
import { useAccessibleMenus } from "./const";

const { Sider } = Layout;

export default function CustomMenu() {
    const { pathname } = useLocation();
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const [selectedItem, setSelectedItem] = useState<string>(ROUTES.DASHBOARD.LINK);
    const { accessibleMenus } = useAccessibleMenus(selectedItem);

    useEffect(() => setSelectedItem(pathname), [pathname]);

    const handleClick = ({ key }: { key: string }) => {
        setSelectedItem(key);

        if (key === ROUTES.AUTH.LOGOUT.LINK) AuthService.logout();
    };

    const determineClass = `custom-sider ${collapsed ? "collapsed" : "expanded"}`;

    return (
        <Layout>
            <Sider trigger={null} collapsed={collapsed} collapsible className={determineClass}>
                <div className={`logo-container ${!collapsed ? "logo-container--active" : ""}`}>
                    <Link to={ROUTES.DASHBOARD.PATH}>
                        <div className='logo'>
                            <img src={Logo} alt='logo' />
                        </div>
                    </Link>
                    <p className='logo-text' style={{ opacity: collapsed ? 0 : 1, minWidth: collapsed ? 0 : "10rem" }}>
                        {APP_TITLE}
                    </p>
                    <Button className='menu-button' type='link' icon={<img src={MenuButton} />} onClick={() => setCollapsed(!collapsed)} />
                </div>

                <Menu
                    mode='inline'
                    defaultSelectedKeys={[selectedItem]}
                    selectedKeys={[selectedItem]}
                    onClick={handleClick}
                    items={accessibleMenus}
                />
            </Sider>
        </Layout>
    );
}
