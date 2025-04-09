import { useEffect } from "react";
import { useMatches } from "react-router-dom";

type TRoute = {
    handle: {
        breadCrumb: string;
    };
};

function useMetaTitle() {
    const matches = useMatches();
    const route = matches[matches.length - 1] as TRoute;


    useEffect(() => {
        const baseTitle = document.title;
        const customTitle = route.handle?.breadCrumb;

        document.title = customTitle ? `${baseTitle} • ${customTitle}` : baseTitle;

        return () => {
            document.title = baseTitle;
        };
    }, [route, matches.length]);
}

export default useMetaTitle;
