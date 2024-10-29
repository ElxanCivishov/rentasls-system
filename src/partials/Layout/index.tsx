import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Menu from "@/components/CustomMenu";

import useMetaTitle from "@/hooks/useMetaTitle";
import ErrorBoundary from "@/utils/ErrorBoundary";
import { Header } from "../Header";
import "./Layout.scss";
import { useUser } from "@/hooks/useUser";

const Layout = function () {
    const { isAdmin } = useUser();

    useMetaTitle();

    const { pathname } = useLocation();

    useEffect(() => {
        const layout = document.querySelector(".layout");

        if (layout) {
            layout.scrollTo({
                top: 0,
            });
        }
    }, [pathname]);

    return (
        <ErrorBoundary>
            <div className='layout-container'>
                {isAdmin && <Menu />}
                <div className='layout-wrapper'>
                    <Header />
                    <main className='layout'>
                        <Outlet />
                    </main>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default Layout;
