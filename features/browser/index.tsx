import Head from "next/head";
import Image from "next/image";

import { useState, useEffect } from "react";

import {
    Navbar,
    DirectoryItemCard,
    RightContext,
    Snackbar,
} from "@/components";

import { NewLinkModal, NewFolderModal } from "./components";
import LeftSideBar from "./components/left-side-bar";
import RightSideBarProperties from "./components/right-side-bar-properties";

import { BE_BASE_URL } from "@/config/be-config";
import { useUserStore, useFetchEffieBENew, useBrowserStore } from "@/hooks";
import { FolderLinkDataArray } from "@/type";
import { BrowserBreadcrumb } from "./components/browser-breadcrumb";

import Page404 from "@/features/page404";

import { LoadingAnimation, Dropdown } from "@/ui";
import InfoIcon from "@/public/icons/info";
import GridIcon from "@/public/icons/grid";
import ListIcon from "@/public/icons/list";
import { saveToCookie } from "@/helper";
import { shallow } from "zustand/shallow";
export default function Browser({
    response,
    isError,
}: {
    response: any;
    isError: any;
}) {
    const subdomain = useUserStore((state: any) => state.subdomain);

    const [
        pathname,
        setPathname,
        view,
        sortOption,
        isSortAsc,
        isNewLinkModalOpen,
        setIsNewLinkModalOpen,
        isNewFolderModalOpen,
        setIsNewFolderModalOpen,
        isRightSideBarPropertiesOpen,
        setIsRightSideBarPropertiesOpen,
        focusedItemData,
        setFocusedItemData,
        doRefetch,
        setDoRefetch,
        setCurrentDirectoryData,
    ] = useBrowserStore(
        (state: any) => [
            state.pathname,
            state.setPathname,
            state.view,
            state.sortOption,
            state.isSortAsc,
            state.isNewLinkModalOpen,
            state.setIsNewLinkModalOpen,
            state.isNewFolderModalOpen,
            state.setIsNewFolderModalOpen,
            state.isRightSideBarPropertiesOpen,
            state.setIsRightSideBarPropertiesOpen,
            state.focusedItemData,
            state.setFocusedItemData,
            state.doRefetch,
            state.setDoRefetch,
            state.setCurrentDirectoryData,
        ],
        shallow
    );

    useEffect(() => {
        setPathname(window.location.pathname);
    }, []);

    // refetch
    const [
        {
            isLoading: isLoadingRefetch,
            isError: isErrorRefetch,
            response: responseRefetch,
            fetchStarted: fetchStartedRefetch,
        },
        refetcher,
    ] = useFetchEffieBENew();

    useEffect(() => {
        // based on the value of isSomethingChanged, and pathname, will:
        // 1. refetch
        // 2. update window.location if pathname is different
        if (!doRefetch) {
            return;
        } else {
            const fetchURL = `${BE_BASE_URL}/directory/${subdomain}${pathname}`;

            refetcher({
                url: fetchURL,
            });

            if (window.location.pathname !== pathname) {
                let newUrl = window.location.origin + pathname;
                window.history.replaceState(null, "", newUrl);
            }
        }
    }, [doRefetch]);

    // 2.
    useEffect(() => {
        if (!isLoadingRefetch && fetchStartedRefetch) {
            // update focused item data
            let newFocusedItemData = undefined;
            if (responseRefetch?.data?.children !== undefined) {
                responseRefetch.data.children.forEach((child: any) => {
                    if (child.relativePath === focusedItemData?.relativePath) {
                        newFocusedItemData = child;
                    }
                });
            }

            setFocusedItemData(newFocusedItemData);

            setDoRefetch(false);
        }
    }, [isLoadingRefetch, fetchStartedRefetch]);

    // return
    if (isError) {
        // console.log("isError");
        // console.error(response.message);
        return <Page404 />;
    }
    if (isErrorRefetch) {
        // console.log("isErrorRefetch");
        // console.error(responseRefetch.message);
        return <Page404 />;
    }

    // preprocess data to be shown
    let responseData = responseRefetch ? responseRefetch.data : response.data;

    setCurrentDirectoryData(responseData);

    const { dataChildrenFolders, dataChildrenLinks } = sortDataToFolderAndLink(
        responseData,
        sortOption,
        isSortAsc
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
                {/* # LEFT SIDEBAR */}
                <LeftSideBar />
                {/* # BACKGROUND */}
                <div
                    className={`z-0 h-full fixed bg-neutral-50 lg:ml-20 bottom-0 lg:top-16 left-0 right-0 lg:rounded-t-2xl duration-500 ease-in-out ${
                        isRightSideBarPropertiesOpen
                            ? "lg:mr-[20vw]"
                            : "lg:mr-6"
                    }`}
                    onClick={() => {
                        // reset focused item
                        setFocusedItemData(undefined);
                    }}
                >
                    <Background />
                </div>
                {/* # CONTENT */}
                <div
                    className={`z-0 absolute lg:ml-20 top-44 md:top-32 left-0 right-0 lg:rounded-t-2xl duration-500 ease-in-out ${
                        isRightSideBarPropertiesOpen
                            ? "lg:mr-[20vw]"
                            : "lg:mr-6"
                    }`}
                >
                    <div
                        className={`${
                            view === "grid" ? "pt-6" : "pt-0"
                        } pb-24 lg:pb-6 px-6 relative`}
                    >
                        {/* ## FOLDER */}

                        {view === "grid" && (
                            <div className="flex justify-between items-center">
                                <h5 className="text-neutral-400 relative z-10 pb-2">
                                    Folders
                                </h5>
                            </div>
                        )}
                        {view === "list" && (
                            <div className="py-3 grid grid-cols-[24px_1fr_1fr_60px] md:grid-cols-[24px_1fr_3fr_8rem_60px] items-center gap-4 border-b-2 !border-neutral-200 border-dashed sticky top-44 md:top-32 bg-neutral-50 z-30">
                                <p className="font-bold text-neutral-900 col-start-2">
                                    Name
                                </p>
                                <p className="font-bold text-neutral-900">
                                    Link
                                </p>
                                <p className="hidden md:block font-bold text-neutral-900">
                                    Access
                                </p>
                            </div>
                        )}
                        <section
                            className={`${
                                view === "grid"
                                    ? "flex-row gap-4 pb-4"
                                    : "flex-col"
                            } flex w-full flex-wrap`}
                        >
                            {view === "grid" && (
                                <DirectoryItemCard
                                    content="new folder"
                                    disabled={isLoadingRefetch}
                                />
                            )}
                            {dataChildrenFolders.map(
                                (folderData: any, index: any) => {
                                    return (
                                        <DirectoryItemCard
                                            disabled={isLoadingRefetch}
                                            key={index}
                                            content="folder"
                                            DirectoryItemData={folderData}
                                        />
                                    );
                                }
                            )}
                        </section>
                        {/* ## LINK */}

                        {view === "grid" && (
                            <h5 className="text-neutral-400 relative z-10 pt-2 pb-2">
                                Links
                            </h5>
                        )}
                        <section
                            className={`${
                                view === "grid" ? "flex-row gap-4" : "flex-col"
                            } flex w-full flex-wrap`}
                        >
                            {view === "grid" && (
                                <DirectoryItemCard
                                    content="new link"
                                    disabled={isLoadingRefetch}
                                />
                            )}
                            {dataChildrenLinks.map(
                                (linkData: any, index: any) => {
                                    return (
                                        <DirectoryItemCard
                                            disabled={isLoadingRefetch}
                                            key={index}
                                            content="link"
                                            DirectoryItemData={linkData}
                                        />
                                    );
                                }
                            )}
                        </section>
                    </div>
                </div>
                {/* # header */}
                {<BrowserHeader isLoadingRefetch={isLoadingRefetch} />}
                {/* # right sidebar */}
                <RightSideBarProperties />
                {/* # MODALS */}
                <NewLinkModal
                    isOpen={isNewLinkModalOpen}
                    onClose={() => setIsNewLinkModalOpen(false)}
                    onNewItemCreated={() => setDoRefetch(true)}
                />
                <NewFolderModal
                    isOpen={isNewFolderModalOpen}
                    onClose={() => setIsNewFolderModalOpen(false)}
                    onNewItemCreated={() => setDoRefetch(true)}
                />
                <RightContext />
                {/* <KeyboardShortcuts
                    isOpen={isKeyboardShortcutsModalOpen}
                    onClose={() => setIsKeyboardShortcutsModalOpen(false)}
                /> */}
            </main>
            <Snackbar className="z-50" />
        </>
    );
}

const Background = () => {
    return (
        <div className="select-none absolute right-0 bottom-16 w-1/2 h-1/2">
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

const BrowserHeader = ({ isLoadingRefetch }: any) => {
    const [
        sortOption,
        setSortOption,
        isSortAsc,
        setIsSortAsc,
        view,
        setView,
        isRightSideBarPropertiesOpen,
        setIsRightSideBarPropertiesOpen,
    ] = useBrowserStore(
        (state: any) => [
            state.sortOption,
            state.setSortOption,
            state.isSortAsc,
            state.setIsSortAsc,
            state.view,
            state.setView,
            state.isRightSideBarPropertiesOpen,
            state.setIsRightSideBarPropertiesOpen,
        ],
        shallow
    );

    return (
        <div
            className={`z-0 fixed bg-neutral-50 lg:ml-20 lg:top-[63px] left-0 right-0 lg:rounded-t-2xl duration-500 ease-in-out ${
                isRightSideBarPropertiesOpen ? "lg:mr-[20vw]" : "lg:mr-6"
            }`}
        >
            <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center max-w-full gap-4 md:gap-0">
                <BrowserBreadcrumb />
                <div className="flex flex-row items-center justify-between md:justify-end gap-2 w-full md:w-auto">
                    <div className="flex flex-row-reverse md:flex-row items-center justify-between w-full">
                        {/* ## LOADING */}
                        <div>{isLoadingRefetch && <SyncingAnimation />}</div>
                        {/* ## SORT */}
                        <div className="flex">
                            <div className="flex gap-2 items-center">
                                <p className="hidden md:block text-neutral-700">
                                    Sort by
                                </p>
                                {/* DROPDOWN INPUT */}
                                <Dropdown
                                    options={["Name", "Link"]}
                                    // Set first letter to uppercase and replace '-' to ' '
                                    // TODO: I don't think this is necessary, might convert back
                                    selectedOption={sortOption
                                        .replace(/-/g, " ")
                                        .replace(/\b\w/g, (l: any) =>
                                            l.toUpperCase()
                                        )}
                                    setSelectedOption={(option: any) => {
                                        setSortOption(option);
                                        saveToCookie("sortOption", option);
                                    }}
                                />
                                {/* ### ASC DESC */}
                                <button
                                    className="text-neutral-700 py-1 rounded-full hover:text-neutral-900 font-normal mr-6"
                                    onClick={() => {
                                        setIsSortAsc(!isSortAsc);
                                        saveToCookie(
                                            "isSortAsc",
                                            String(!isSortAsc)
                                        );
                                    }}
                                >
                                    {isSortAsc ? "A → Z" : "Z → A"}
                                </button>
                            </div>
                            {/* ## VIEW */}
                            <div className="flex gap-2">
                                {/* ### GRID */}
                                <button
                                    onClick={() => {
                                        setView("grid");
                                        saveToCookie("view", "grid");
                                    }}
                                    className={`${
                                        view === "grid"
                                            ? "bg-primary-100"
                                            : "hover:bg-primary-50"
                                    } p-1 rounded-md duration-100`}
                                >
                                    <GridIcon />
                                </button>
                                {/* ### LIST */}
                                <button
                                    onClick={() => {
                                        setView("list");
                                        saveToCookie("view", "list");
                                    }}
                                    className={`${
                                        view === "list"
                                            ? "bg-primary-100"
                                            : "hover:bg-primary-50"
                                    } p-1  rounded-md duration-100`}
                                >
                                    <ListIcon />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ## INFO */}
                    <button
                        className="ml-4"
                        onClick={() => {
                            setIsRightSideBarPropertiesOpen(
                                !isRightSideBarPropertiesOpen
                            );
                        }}
                    >
                        <InfoIcon className="h-8 w-8" aria-label="Info" />
                    </button>
                </div>
            </div>
        </div>
    );
};

function sortDataToFolderAndLink(input: any, sortOption: string, asc: boolean) {
    let data: FolderLinkDataArray = input;
    // setup dataChildren as array
    let dataChildrenFolders: any = [];
    let dataChildrenLinks: any = [];

    data?.children?.forEach((child: any) => {
        if (child.type === "folder") {
            // key value of child and data
            dataChildrenFolders.push(child);
        }
        if (child.type === "link") {
            dataChildrenLinks.push(child);
        }
    });
    // sort based on isPinned and then title alphabetically
    dataChildrenFolders.sort((a: any, b: any) => {
        if (a.isPinned === b.isPinned) {
            if ((sortOption === "name" || sortOption === "link") && asc) {
                return a.title.localeCompare(b.title);
            } else if (
                (sortOption === "name" || sortOption === "link") &&
                !asc
            ) {
                return b.title.localeCompare(a.title);
            }
        }
        if (a.isPinned) {
            return -1;
        }
        return 1;
    });
    dataChildrenLinks.sort((a: any, b: any) => {
        if (a.isPinned === b.isPinned) {
            if (sortOption === "name" && asc) {
                return a.title.localeCompare(b.title);
            } else if (sortOption === "name" && !asc) {
                return b.title.localeCompare(a.title);
            } else if (sortOption === "link" && asc) {
                return a.link.localeCompare(b.link);
            } else if (sortOption === "link" && !asc) {
                return b.link.localeCompare(a.link);
            }
        }
        if (a.isPinned) {
            return -1;
        }
        return 1;
    });
    return { dataChildrenFolders, dataChildrenLinks };
}

function SyncingAnimation() {
    // make the dot animate
    return (
        <h6 className="text-primary-600 animate-pulse md:mx-6">
            <LoadingAnimation bg="rgb(var(--color-neutral-900))" />
        </h6>
    );
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
