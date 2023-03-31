import Head from "next/head";
import DirectoryItemCard from "@/components/directory-item-card";
import Image from "next/image";
import SideBar from "@/components/side-bar";
import { BE_BASE_URL } from "@/config/be-config";
import { useFetchEffieBE, useUserStore } from "@/hooks";
import { useRouter, Router } from "next/router";
import { useState, useEffect } from "react";
import { KeyboardShortcuts, NewLink, NewFolder } from "@/components";
import { Breadcrumb } from "@/ui";
import SideBarProperties from "@/components/side-bar-properties";
import { FolderLinkData, FolderLinkDataArray } from "@/type";
import useDelayUnmount from "@/hooks/useDelayUnmount";
import { useFetchEffieBENew } from "@/hooks/useFetchEffieBENew";

const dummyFolderLinkData: FolderLinkData = {
    title: "",
    isPinned: false,
    link: "",
    type: "folder",
    shareConfiguration: {
        isShared: false,
        sharedPrivilege: "read",
    },
};

export default function Browser() {
    // KEYBOARD SHORTCUTS
    // CURRENTLY DEACTIVATED BECAUSE IT INTERFERES WITH INPUT
    // ? - help
    // l - new link
    // f - new folder
    // u - go up one folder in the path
    // listeners
    // useEffect(() => {
    //     const handleKeyDown = (e: KeyboardEvent) => {
    //         if (!isNewFolderModalOpen && !isNewLinkModalOpen && !isKeyboardShortcutsModalOpen) {
    //             if (e.key === "?") {
    //                 setIsKeyboardShortcutsModalOpen(true);
    //             }
    //             if (e.key === "l") {
    //                 handleNewLinkClick();
    //             }
    //             if (e.key === "f") {
    //                 handleNewFolderClick();
    //             }
    //             if (e.key === "u") {
    //                 router.push(
    //                     `/${location.slice(0, location.length - 1).join("/")}`
    //                 );
    //             }
    //         }
    //     };
    //     window.addEventListener("keydown", handleKeyDown);
    //     return () => {
    //         window.removeEventListener("keydown", handleKeyDown);
    //     };
    // }, [location]);

    const router = useRouter();
    const pathname = router.asPath;

    const subdomain = useUserStore((state: any) => state.subdomain);

    const [isNewLinkModalOpen, setIsNewLinkModalOpen] = useState(false);
    const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
    const [isKeyboardShortcutsModalOpen, setIsKeyboardShortcutsModalOpen] =
        useState(false);
    const [isSideBarPropertiesOpen, setIsSideBarPropertiesOpen] =
        useState(false);

    const [focusedItemData, setFocusedItemData] = useState<any>(undefined);
    const [focusedItemName, setFocusedItemName] = useState<string>("");

    const handleNewLinkClick = () => {
        setIsNewLinkModalOpen(true);
    };
    const handleNewFolderClick = () => {
        setIsNewFolderModalOpen(true);
    };

    const [{ isLoading, isError, response, fetchStarted }, fetcher] =
        useFetchEffieBENew();

    useEffect(() => {
        setFocusedItemData(undefined);
        setFocusedItemName("");
        fetcher({
            url: `${BE_BASE_URL}/directory/${subdomain}${pathname}`,
        });
    }, [subdomain, pathname]);

    if (isError) {
        return <div>Error:{response.message}</div>;
    }
    if (isLoading || !fetchStarted) {
        return <>skeleton</>;
    }

    let data: FolderLinkDataArray = response.data;
    // setup dataChildren as array
    let dataChildrenFolders: any = [];
    let dataChildrenLinks: any = [];
    data &&
        data.childrens &&
        Object.keys(data.childrens).forEach((child: any) => {
            if (data?.childrens) {
                if (data.childrens[child].type === "folder") {
                    // key value of child and data
                    dataChildrenFolders.push({
                        key: child,
                        data: data.childrens[child],
                    });
                }
                if (data.childrens[child].type === "link") {
                    dataChildrenLinks.push({
                        key: child,
                        data: data.childrens[child],
                    });
                }
            }
        });
    // sort based on isPinned and then title alphabetically
    dataChildrenFolders.sort((a: any, b: any) => {
        if (a.data.isPinned === b.data.isPinned) {
            return a.data.title.localeCompare(b.data.title);
        }
        if (a.data.isPinned) {
            return -1;
        }
        return 1;
    });
    dataChildrenLinks.sort((a: any, b: any) => {
        if (a.data.isPinned === b.data.isPinned) {
            return a.data.title.localeCompare(b.data.title);
        }
        if (a.data.isPinned) {
            return -1;
        }
        return 1;
    });

    return (
        <>
            <Head>
                <title>Effie</title>
                <meta
                    name="description"
                    content="All your links, in one place."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <main
                className={` w-full h-full z-10 flex flex-col-reverse lg:flex-row`}
            >
                {/* LEFT SIDEBAR */}
                <SideBar
                    handleNewLinkClick={handleNewLinkClick}
                    handleNewFolderClick={handleNewFolderClick}
                />

                {/* BROWSER CONTENT*/}
                <div className="p-8 relative w-full h-full bg-neutral-50 z-0 flex flex-col gap-6 flex-grow lg:rounded-t-2xl">
                    {/* BACKGROUND */}
                    <Background />
                    {/* BREADCRUMBS */}
                    <div className="flex py-4 justify-between">
                        <BrowserBreadcrumb />
                        <button
                            onClick={() => {
                                setIsSideBarPropertiesOpen(
                                    !isSideBarPropertiesOpen
                                );
                            }}
                        >
                            open properties
                        </button>
                    </div>

                    {/* CONTENT */}
                    <div>
                        <h5 className="text-neutral-400 relative z-10  pb-2">
                            Folders
                        </h5>
                        <section className="flex gap-4 w-full flex-wrap">
                            <DirectoryItemCard
                                content="new folder"
                                onClick={handleNewFolderClick}
                            />
                            {dataChildrenFolders.map(
                                (folder: any, index: any) => {
                                    let child = folder.key;
                                    let data = folder.data;
                                    return (
                                        <DirectoryItemCard
                                            key={index}
                                            content="folder"
                                            relativePath={child}
                                            DirectoryItemData={data}
                                            onDoubleClick={() => {
                                                router.push(
                                                    `${pathname}/${child}`
                                                );
                                            }}
                                            onClick={() => {
                                                setFocusedItemData(data);
                                                setFocusedItemName(child);
                                            }}
                                            isFocused={
                                                focusedItemName === child
                                            }
                                        />
                                    );
                                }
                            )}
                        </section>

                        <h5 className="text-neutral-400 relative z-10 pt-6 pb-2">
                            Links
                        </h5>
                        <section className="flex gap-4 w-full flex-wrap">
                            <DirectoryItemCard
                                content="new link"
                                onClick={handleNewLinkClick}
                            />
                            {dataChildrenLinks.map((link: any, index: any) => {
                                let child = link.key;
                                let data = link.data;
                                return (
                                    <DirectoryItemCard
                                        key={index}
                                        content="link"
                                        relativePath={child}
                                        DirectoryItemData={data}
                                        onDoubleClick={() => {
                                            window.location.href = data.url;
                                        }}
                                        onClick={() => {
                                            setFocusedItemData(data);
                                            setFocusedItemName(child);
                                        }}
                                        isFocused={focusedItemName === child}
                                    />
                                );
                            })}
                        </section>
                    </div>
                </div>
                <div className="w-1/3">
                    {/* SIDEBAR PROPERTIES */}
                    <SideBarProperties
                        isOpen={isSideBarPropertiesOpen}
                        itemData={focusedItemData}
                        relativePath={focusedItemName}
                    />
                </div>
            </main>

            {/* MODALS */}
            <NewLink
                isOpen={isNewLinkModalOpen}
                onClose={() => setIsNewLinkModalOpen(false)}
            />
            <NewFolder
                isOpen={isNewFolderModalOpen}
                onClose={() => setIsNewFolderModalOpen(false)}
            />
            <KeyboardShortcuts
                isOpen={isKeyboardShortcutsModalOpen}
                onClose={() => setIsKeyboardShortcutsModalOpen(false)}
            />
        </>
    );
}

const Background = () => {
    return (
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2">
            <Image
                src={"/images/background.png"}
                alt=""
                fill
                style={{
                    objectFit: "contain",
                    objectPosition: "bottom right",
                }}
            />
        </div>
    );
};

const BrowserBreadcrumb = () => {
    const subdomain = useUserStore((state: any) => state.subdomain);
    const router = useRouter();

    const location = router.asPath
        .split("/")
        .filter((loc: string) => loc !== "");

    return (
        <div className="top-16 flex items-center z-10 ">
            <Breadcrumb
                path={subdomain}
                onClick={() => {
                    router.push(`/`);
                }}
                className="pr-4"
            />
            {((window.innerWidth < 768 && location.length > 1) ||
                (window.innerWidth >= 768 && location.length > 3)) && (
                <>
                    <p className="text-neutral-300">/</p>
                    <Breadcrumb
                        path="..."
                        onClick={() => {
                            router.push(
                                `/${location
                                    .slice(0, window.innerWidth < 768 ? -1 : -3)
                                    .join("/")}`
                            );
                        }}
                        className="px-4"
                    />
                </>
            )}
            {location
                .slice(window.innerWidth < 768 ? -1 : -3)
                .map((loc: any, index: any) => {
                    return (
                        <>
                            <p key={"p" + index} className="text-neutral-300">
                                /
                            </p>
                            <Breadcrumb
                                key={index}
                                path={loc}
                                onClick={() => {
                                    router.push(
                                        `/${location
                                            .slice(0, index + 1)
                                            .join("/")}`
                                    );
                                }}
                                className="px-4"
                            />
                        </>
                    );
                })}
        </div>
    );
};
