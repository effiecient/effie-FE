import { useBrowserStore, useUserStore, useWindowSize } from "@/hooks";
import { Breadcrumb } from "@/ui";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

export const BrowserBreadcrumb = () => {
    const subdomain = useUserStore((state: any) => state.subdomain);
    const [
        pathname,
        setPathname,
        doRefetch,
        setDoRefetch,
        currentDirectoryData,
        setFocusedItemData,
        setFocusedPathname,
        setIsClickedFromBreadcrumb,
    ] = useBrowserStore(
        (state: any) => [
            state.pathname,
            state.setPathname,
            state.doRefetch,
            state.setDoRefetch,
            state.currentDirectoryData,
            state.setFocusedItemData,
            state.setFocusedPathname,
            state.setIsClickedFromBreadcrumb,
        ],
        shallow
    );

    const [location, setLocation] = useState<any>([]);

    useEffect(() => {
        setLocation(pathname.split("/").filter((loc: string) => loc !== ""));
    }, [pathname]);

    const { width = 768 } = useWindowSize();

    const handleBreadcrumbClick = (newPathname: string) => {
        // prevent refetch when loading
        if (doRefetch) {
            return;
        }
        setPathname(newPathname);
        setDoRefetch(true);
    };
    return (
        <div className="flex">
            <Breadcrumb
                path={subdomain}
                onClick={() => {
                    // if root breadcrumb is clicked and in root, do nothing
                    if (location.length === 0) {
                        return;
                    } else {
                        handleBreadcrumbClick(`/`);
                    }
                }}
                className="pr-4"
            />
            {((width < 768 && location.length > 1) ||
                (width && location.length > 3)) && (
                <div className="flex">
                    <span className="text-neutral-300">/</span>
                    <Breadcrumb
                        path="..."
                        onClick={() => {
                            handleBreadcrumbClick(
                                `/${location
                                    .slice(0, width < 768 ? -1 : -3)
                                    .join("/")}`
                            );
                        }}
                        className="px-4"
                    />
                </div>
            )}
            {location
                .slice(width < 768 ? -1 : -3)
                .map((loc: any, index: any) => {
                    return (
                        <div className="flex" key={index}>
                            <span className="text-neutral-300">/</span>
                            <Breadcrumb
                                key={index}
                                path={loc}
                                onClick={() => {
                                    // if last breadcrumb is clicked, focus on current directory
                                    if (index === location.length - 1) {
                                        setIsClickedFromBreadcrumb(true);
                                        setFocusedItemData(
                                            currentDirectoryData
                                        );
                                        setFocusedPathname(
                                            currentDirectoryData.path
                                        );
                                    } else {
                                        handleBreadcrumbClick(
                                            `/${location
                                                .slice(0, index + 1)
                                                .join("/")}`
                                        );
                                    }
                                }}
                                className="px-4"
                            />
                        </div>
                    );
                })}
        </div>
    );
};
