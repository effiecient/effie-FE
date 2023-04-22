import { useRenderingStore, useUserStore } from "@/hooks";
import { Breadcrumb } from "@/ui";
import { useRouter } from "next/router";

export const BrowserBreadcrumb = ({ onBreadcrumbClick }: any) => {
    const subdomain = useUserStore((state: any) => state.subdomain);
    const router = useRouter();

    const location = window.location.pathname
        .split("/")
        .filter((loc: string) => loc !== "");

    const showSkeleton = useRenderingStore((state: any) => state.showSkeleton);
    if (showSkeleton) {
        return (
            <span>
                <div className="animate-pulse h-5 w-16 bg-neutral-200 rounded-full" />
            </span>
        );
    }
    return (
        <span>
            <Breadcrumb
                path={subdomain}
                onClick={() => {
                    // if last breadcrumb is clicked, do nothing
                    if (location.length === 0) return;
                    onBreadcrumbClick(`/`);
                }}
                className="pr-4"
            />
            {((window.innerWidth < 768 && location.length > 1) ||
                (window.innerWidth >= 768 && location.length > 3)) && (
                <span>
                    <span className="text-neutral-300">/</span>
                    <Breadcrumb
                        path="..."
                        onClick={() => {
                            onBreadcrumbClick(
                                `/${location
                                    .slice(0, window.innerWidth < 768 ? -1 : -3)
                                    .join("/")}`
                            );
                        }}
                        className="px-4"
                    />
                </span>
            )}
            {location
                .slice(window.innerWidth < 768 ? -1 : -3)
                .map((loc: any, index: any) => {
                    return (
                        <span key={index}>
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
                        </span>
                    );
                })}
        </span>
    );
};
