import { useRenderingStore, useUserStore, useWindowSize } from "@/hooks";
import { Breadcrumb } from "@/ui";
import { useEffect, useState } from "react";

export const BrowserBreadcrumb = ({ onBreadcrumbClick }: any) => {
    const subdomain = useUserStore((state: any) => state.subdomain);
    console.log("subdomain", subdomain);
    const pathname = useUserStore((state: any) => state.pathname);

    const [location, setLocation] = useState<any>([]);

    useEffect(() => {
        setLocation(pathname.split("/").filter((loc: string) => loc !== ""));
    }, [pathname]);

    const { width = 768 } = useWindowSize();

    console.log("location", location);

    return (
        <div className="flex">
            <Breadcrumb
                path={subdomain}
                onClick={() => {
                    // if last breadcrumb is clicked, do nothing
                    if (location.length === 0) return;
                    onBreadcrumbClick(`/`);
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
                            onBreadcrumbClick(
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
                                    // if last breadcrumb is clicked, do nothing
                                    if (index === location.length - 1) return;

                                    onBreadcrumbClick(
                                        `/${location
                                            .slice(0, index + 1)
                                            .join("/")}`
                                    );
                                }}
                                className="px-4"
                            />
                        </div>
                    );
                })}
        </div>
    );
};
