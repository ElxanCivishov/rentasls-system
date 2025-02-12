import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider as DesignConfigProvider, ThemeConfig } from "antd";
import AzLocale from "antd/locale/az_AZ";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import "./App.scss";
import { Loading } from "./components/CustomLoading";
import { CustomNoOptions } from "./components/CustomNoOptions";

import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<Loading />}>
                <DesignConfigProvider renderEmpty={CustomNoOptions} theme={antTheme} locale={AzLocale}>
                    <RouterProvider router={routes} />

                    <Toaster position='bottom-center' toastOptions={{ duration: 4000, position: "top-right" }} />
                </DesignConfigProvider>
            </Suspense>
        </QueryClientProvider>
    );
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            refetchOnWindowFocus: true,
            refetchOnReconnect: true,
        },
    },
});

const antTheme: ThemeConfig = {
    token: {
        colorPrimary: "#3C7167",
        borderRadius: 8,
    },
    components: {
        Steps: {
            iconSize: 48,
        },
    },
};

export default App;
