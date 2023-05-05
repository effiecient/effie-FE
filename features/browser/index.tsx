import Head from "next/head";
import DirectoryItemCard from "@/components/directory-item-card";
import Image from "next/image";
import LeftSideBar from "./left-side-bar";
import { BE_BASE_URL } from "@/config/be-config";
import { useRenderingStore, useUserStore } from "@/hooks";
import { useState, useEffect } from "react";
import { KeyboardShortcuts, NewLink, NewFolder, Navbar } from "@/components";
import RightSideBarProperties from "./right-side-bar-properties";
import { FolderLinkDataArray } from "@/type";
import { useFetchEffieBENew } from "@/hooks/useFetchEffieBENew";

import Page404 from "../page404";
import { BrowserBreadcrumb } from "./browser-breadcrumb";
import { LoadingAnimation, Dropdown } from "@/ui";
import InfoIcon from "@/public/icons/info";
import GridIcon from "@/public/icons/grid";
import ListIcon from "@/public/icons/list";

export default function Browser() {
    let pathname: any;

    const subdomain = useUserStore((state: any) => state.subdomain);
    const setPathname = useUserStore((state: any) => state.setPathname);
    const setShowSkeleton = useRenderingStore(
        (state: any) => state.setShowSkeleton
    );

    const [view, setView] = useState<string>("grid");
    const [sortOption, setSortOption] = useState<string>("name");
    const [isSortAsc, setIsSortAsc] = useState<boolean>(true);
    const [isNewLinkModalOpen, setIsNewLinkModalOpen] = useState(false);
    const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
    const [isKeyboardShortcutsModalOpen, setIsKeyboardShortcutsModalOpen] =
        useState(false);

    const [isRightSideBarPropertiesOpen, setIsRightSideBarPropertiesOpen] =
        useState(false);

    const [focusedItemData, setFocusedItemData] = useState<any>(undefined);
    const [focusedItemName, setFocusedItemName] = useState<string>("");
    const [isSomethingChanged, setIsSomethingChanged] =
        useState<boolean>(false);

    const handleNewLinkClick = () => {
        setIsNewLinkModalOpen(true);
    };
    const handleNewFolderClick = () => {
        setIsNewFolderModalOpen(true);
    };
    const handleDirectoryCardClick = (child: any) => {
        console.log(window.location.origin);
        let newUrl = window.location.origin;
        //  check if pathame start with /. if not, append / to new url
        if (pathname[0] !== "/") {
            newUrl += "/";
        }
        newUrl += `${pathname}/${child}`;
        console.log("newUrl", newUrl);

        // let newUrl = `${pathname}/${child}`;

        console.log("newUrl", newUrl);

        // change path without rerendering
        window.history.replaceState(
            {
                ...window.history.state,
                as: newUrl,
                url: newUrl,
            },
            "",
            newUrl
        );
        updatePathname();

        setIsSomethingChanged(true);
    };
    const handleBreadcrumbClick = (newUrl: any) => {
        // change path without rerendering
        window.history.replaceState(
            {
                ...window.history.state,
                as: newUrl,
                url: newUrl,
            },
            "",
            newUrl
        );
        updatePathname();

        setIsSomethingChanged(true);
    };

    const updatePathname = () => {
        if (typeof window !== "undefined") {
            pathname = window.location.pathname;
            // remove / in the front if exists
            if (pathname[0] === "/") {
                pathname = pathname.slice(1);
            }
            setPathname(pathname);
        }
    };
    updatePathname();

    const fetchURL = `${BE_BASE_URL}/directory/${subdomain}/${pathname}`;

    // initial fetch
    const [{ isLoading, isError, response, fetchStarted }, fetcher] =
        useFetchEffieBENew();

    useEffect(() => {
        fetcher({
            url: fetchURL,
        });
    }, [subdomain]);

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
        if (!isSomethingChanged) {
            return;
        } else {
            refetcher({
                url: fetchURL,
            });
        }
    }, [isSomethingChanged]);

    useEffect(() => {
        if (!isLoadingRefetch && fetchStartedRefetch) {
            // update focused item data
            let focusedItemData = undefined;
            if (responseRefetch?.data?.children !== undefined) {
                if (focusedItemName in responseRefetch.data.children) {
                    focusedItemData =
                        responseRefetch.data.children[focusedItemName];
                }
            }
            if (focusedItemData === undefined) {
                setFocusedItemName("");
            }
            setFocusedItemData(focusedItemData);

            setIsSomethingChanged(false);
        }
    }, [isLoadingRefetch, fetchStartedRefetch]);

    // return
    if (isError) {
        console.error(response.message);
        return <Page404 />;
    }
    if (isErrorRefetch) {
        console.error(responseRefetch.message);
        return <Page404 />;
    }

    // show skeleton
    setShowSkeleton(true);

    if (isLoading || !fetchStarted) {
        return (
            <>
                <main className="bg-white w-full h-full">
                    <Navbar />
                    {/* left sidebar */}
                    <LeftSideBar
                        handleNewLinkClick={handleNewLinkClick}
                        handleNewFolderClick={handleNewFolderClick}
                    />
                    {/* background */}
                    <div
                        className={`z-0 h-full fixed bg-neutral-50 lg:ml-20 bottom-0 lg:top-16 left-0 right-0 lg:rounded-t-2xl duration-500 ease-in-out ${
                            isRightSideBarPropertiesOpen
                                ? "lg:mr-[20vw]"
                                : "lg:mr-6"
                        }`}
                    >
                        <Background />
                    </div>
                    {/* content */}
                    <div
                        className={`z-0 absolute lg:ml-20 top-44 md:top-32 left-0 right-0 lg:rounded-t-2xl duration-500 ease-in-out ${
                            isRightSideBarPropertiesOpen
                                ? "lg:mr-[20vw]"
                                : "lg:mr-6"
                        }`}
                    >
                        <div className="p-6">
                            <h5 className="z-10 pb-2">
                                <p className="bg-neutral-200 w-12 rounded-full h-5 pb-2 relative" />
                            </h5>
                            <section className="flex gap-4 w-full flex-wrap">
                                <DirectoryItemCard
                                    content="new folder"
                                    view={view}
                                />
                                <DirectoryItemCard
                                    content="new folder"
                                    view={view}
                                />
                            </section>
                        </div>
                    </div>
                    {/* header */}
                    <div
                        className={`z-0 fixed bg-neutral-50 lg:ml-20 lg:top-[63px] left-0 right-0 lg:rounded-t-2xl duration-500 ease-in-out ${
                            isRightSideBarPropertiesOpen
                                ? "lg:mr-[20vw]"
                                : "lg:mr-6"
                        }`}
                    >
                        <div className="p-6 flex justify-between items-center">
                            <BrowserBreadcrumb
                                onBreadcrumbClick={handleBreadcrumbClick}
                            />
                            <div className="w-[30px] h-[30px] rounded-full bg-neutral-200 animate-pulse" />
                        </div>
                    </div>
                </main>
            </>
        );
    }
    setShowSkeleton(false);

    // preprocess data to be shown
    let responseData;
    if (responseRefetch !== undefined) {
        responseData = responseRefetch.data;
    } else {
        responseData = response.data;
    }

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
                {/* left sidebar */}
                <LeftSideBar
                    handleNewLinkClick={handleNewLinkClick}
                    handleNewFolderClick={handleNewFolderClick}
                />
                {/* background */}
                <div
                    className={`z-0 h-full fixed bg-neutral-50 lg:ml-20 bottom-0 lg:top-16 left-0 right-0 lg:rounded-t-2xl duration-500 ease-in-out ${
                        isRightSideBarPropertiesOpen
                            ? "lg:mr-[20vw]"
                            : "lg:mr-6"
                    }`}
                    onClick={() => {
                        // reset focused item
                        setFocusedItemData(undefined);
                        setFocusedItemName("");
                    }}
                >
                    <Background />
                </div>

                {/* CONTENT */}
                <div
                    className={`z-0 absolute lg:ml-20 top-44 md:top-32 left-0 right-0 lg:rounded-t-2xl duration-500 ease-in-out ${
                        isRightSideBarPropertiesOpen
                            ? "lg:mr-[20vw]"
                            : "lg:mr-6"
                    }`}
                >
                    <div className="pb-24 lg:pb-6 p-6 relative">
                        {view === "grid" && (
                            // header
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
                                view === "grid" ? "flex-row" : "flex-col"
                            } flex gap-4 w-full flex-wrap pb-4`}
                        >
                            {view === "grid" && (
                                <DirectoryItemCard
                                    content="new folder"
                                    onClick={handleNewFolderClick}
                                    view={view}
                                />
                            )}
                            {dataChildrenFolders.map(
                                (folderData: any, index: any) => {
                                    return (
                                        <DirectoryItemCard
                                            key={index}
                                            content="folder"
                                            relativePath={
                                                folderData.relativePath
                                            }
                                            DirectoryItemData={folderData}
                                            onDoubleClick={() => {
                                                handleDirectoryCardClick(
                                                    folderData.relativePath
                                                );
                                            }}
                                            onClick={() => {
                                                setFocusedItemData(folderData);
                                                setFocusedItemName(
                                                    folderData.relativePath
                                                );
                                            }}
                                            isFocused={
                                                focusedItemName ===
                                                folderData.relativePath
                                            }
                                            view={view}
                                        />
                                    );
                                }
                            )}
                        </section>

                        {view === "grid" && (
                            <h5 className="text-neutral-400 relative z-10 pt-2 pb-2">
                                Links
                            </h5>
                        )}
                        <section
                            className={`${
                                view === "grid" ? "flex-row" : "flex-col"
                            } flex gap-4 w-full flex-wrap`}
                        >
                            {view === "grid" && (
                                <DirectoryItemCard
                                    content="new link"
                                    onClick={handleNewLinkClick}
                                    view={view}
                                />
                            )}
                            {dataChildrenLinks.map(
                                (linkData: any, index: any) => {
                                    return (
                                        <DirectoryItemCard
                                            key={index}
                                            content="link"
                                            relativePath={linkData.relativePath}
                                            DirectoryItemData={linkData}
                                            onDoubleClick={() => {
                                                // open url in new page
                                                window.open(
                                                    linkData.link,
                                                    "_blank"
                                                );
                                            }}
                                            onClick={() => {
                                                setFocusedItemData(linkData);
                                                setFocusedItemName(
                                                    linkData.relativePath
                                                );
                                            }}
                                            isFocused={
                                                focusedItemName ===
                                                linkData.relativePath
                                            }
                                            view={view}
                                        />
                                    );
                                }
                            )}
                        </section>
                    </div>
                </div>

                {/* header */}
                <div
                    className={`z-0 fixed bg-neutral-50 lg:ml-20 lg:top-[63px] left-0 right-0 lg:rounded-t-2xl duration-500 ease-in-out ${
                        isRightSideBarPropertiesOpen
                            ? "lg:mr-[20vw]"
                            : "lg:mr-6"
                    }`}
                >
                    <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center max-w-full gap-4 md:gap-0">
                        <BrowserBreadcrumb
                            onBreadcrumbClick={handleBreadcrumbClick}
                        />
                        <div className="flex flex-row items-center justify-between md:justify-end gap-2 w-full md:w-auto">
                            {/* LOADING */}
                            {isLoadingRefetch && <SyncingAnimation />}
                            {/* SORT */}
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
                                        .replace(/\b\w/g, (l) =>
                                            l.toUpperCase()
                                        )}
                                    setSelectedOption={setSortOption}
                                />
                                {/* ASC DESC */}
                                <button
                                    className="text-neutral-700 py-1 rounded-full hover:text-neutral-900 font-normal mr-6"
                                    onClick={() => setIsSortAsc(!isSortAsc)}
                                >
                                    {isSortAsc ? "A → Z" : "Z → A"}
                                </button>
                            </div>
                            {/* VIEW */}
                            <div className="flex gap-2">
                                {/* GRID */}
                                <button
                                    onClick={() => setView("grid")}
                                    className={`${
                                        view === "grid"
                                            ? "bg-primary-100"
                                            : "hover:bg-primary-50"
                                    } p-1 rounded-md duration-100`}
                                >
                                    <GridIcon />
                                </button>
                                {/* LIST */}
                                <button
                                    onClick={() => setView("list")}
                                    className={`${
                                        view === "list"
                                            ? "bg-primary-100"
                                            : "hover:bg-primary-50"
                                    } p-1  rounded-md duration-100`}
                                >
                                    <ListIcon />
                                </button>
                            </div>
                            {/* INFO */}
                            <button
                                className="ml-4"
                                onClick={() => {
                                    setIsRightSideBarPropertiesOpen(
                                        !isRightSideBarPropertiesOpen
                                    );
                                }}
                            >
                                <InfoIcon
                                    className="h-8 w-8"
                                    aria-label="Info"
                                />
                            </button>
                        </div>
                    </div>
                </div>
                {/* right sidebar */}
                <RightSideBarProperties
                    onClose={() => setIsRightSideBarPropertiesOpen(false)}
                    isOpen={isRightSideBarPropertiesOpen}
                    itemData={focusedItemData}
                    relativePath={focusedItemName}
                    onUpdate={() => setIsSomethingChanged(true)}
                />
                {/* MODALS */}
                <NewLink
                    isOpen={isNewLinkModalOpen}
                    onClose={() => setIsNewLinkModalOpen(false)}
                    onNewItemCreated={() => setIsSomethingChanged(true)}
                />
                <NewFolder
                    isOpen={isNewFolderModalOpen}
                    onClose={() => setIsNewFolderModalOpen(false)}
                    onNewItemCreated={() => setIsSomethingChanged(true)}
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
        <div className="absolute right-0 bottom-16 w-1/2 h-1/2">
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
    // console.log("dataChildrenFolders");
    // console.log(dataChildrenFolders);
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
        <h6 className="text-primary-600 animate-pulse">
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
