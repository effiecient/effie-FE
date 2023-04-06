import { useUserStore } from "@/hooks";
import { Breadcrumb } from "@/ui";
import { useRouter } from "next/router";

export const BrowserBreadcrumb = ({ onBreadcrumbClick }: any) => {
    const subdomain = useUserStore((state: any) => state.subdomain);
    const router = useRouter();

    const location = window.location.pathname
        .split("/")
        .filter((loc: string) => loc !== "");

    return (
        <span>
            <Breadcrumb
                path={subdomain}
                onClick={() => {
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
