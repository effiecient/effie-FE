import Head from "next/head";
import DirectoryItemCard from "@/components/directory-item-card";
import Image from "next/image";
import SideBar from "./side-bar";
import { BE_BASE_URL } from "@/config/be-config";
import { useUserStore } from "@/hooks";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { KeyboardShortcuts, NewLink, NewFolder, Navbar } from "@/components";
import SideBarProperties from "./side-bar-properties";
import { FolderLinkData, FolderLinkDataArray } from "@/type";
import { useFetchEffieBENew } from "@/hooks/useFetchEffieBENew";

import Page404 from "../page404";
import { BrowserBreadcrumb } from "./browser-breadcrumb";

export default function Browser() {
    const router = useRouter();
    const pathname = window.location.pathname;

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
    }, [subdomain]);

    if (isError) {
        console.error(response.message);
        return <Page404 />;
    }
    if (isLoading || !fetchStarted) {
        return <>skeleton</>;
    }

    const { dataChildrenFolders, dataChildrenLinks } = sortDataToFolderAndLink(
        response.data
    );
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
            <main className="bg-white w-full h-full">
                <Navbar />
                {/* left sidebar */}
                <SideBar
                    handleNewLinkClick={handleNewLinkClick}
                    handleNewFolderClick={handleNewFolderClick}
                />
                {/* background */}
                <div
                    className={`z-0 h-full fixed bg-neutral-50 lg:ml-20 bottom-0 lg:top-16 left-0 right-0 lg:rounded-t-2xl duration-500 ease-in-out ${
                        isSideBarPropertiesOpen ? "lg:mr-[20vw]" : "lg:mr-6"
                    }`}
                >
                    <Background />
                </div>

                {/* content */}
                <div
                    className={`z-0 absolute lg:ml-20 top-32 left-0 right-0 lg:rounded-t-2xl duration-500 ease-in-out ${
                        isSideBarPropertiesOpen ? "lg:mr-[20vw]" : "lg:mr-6"
                    }`}
                >
                    <div className="p-6">
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
                                            // open url in new page
                                            window.open(data.link, "_blank");
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

                {/* header */}
                <div
                    className={`z-0 fixed bg-neutral-50 lg:ml-20 lg:top-[63px] left-0 right-0 lg:rounded-t-2xl duration-500 ease-in-out ${
                        isSideBarPropertiesOpen ? "lg:mr-[20vw]" : "lg:mr-6"
                    }`}
                >
                    <div className="p-6 flex justify-between">
                        <BrowserBreadcrumb />
                        <button
                            onClick={() => {
                                setIsSideBarPropertiesOpen(
                                    !isSideBarPropertiesOpen
                                );
                            }}
                        >
                            <Image
                                width={20}
                                height={20}
                                src="/icons/info.svg"
                                alt="info"
                                className="h-8 w-8"
                            />
                        </button>
                    </div>
                </div>
                {/* right sidebar */}
                <SideBarProperties
                    onClose={() => setIsSideBarPropertiesOpen(false)}
                    isOpen={isSideBarPropertiesOpen}
                    itemData={focusedItemData}
                    relativePath={focusedItemName}
                />
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
            </main>
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

function sortDataToFolderAndLink(input: any) {
    let data: FolderLinkDataArray = input;
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
    return { dataChildrenFolders, dataChildrenLinks };
}

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
