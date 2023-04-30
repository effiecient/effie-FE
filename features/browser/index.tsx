import Head from "next/head";
import DirectoryItemCard from "@/components/directory-item-card";
import Image from "next/image";
import SideBar from "./side-bar";
import { BE_BASE_URL } from "@/config/be-config";
import { useRenderingStore, useUserStore } from "@/hooks";
import { useState, useEffect } from "react";
import { KeyboardShortcuts, NewLink, NewFolder, Navbar } from "@/components";
import SideBarProperties from "./side-bar-properties";
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

    const [isSideBarPropertiesOpen, setIsSideBarPropertiesOpen] =
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
        let newUrl = `${pathname}/${child}`;
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
            if (responseRefetch?.data?.childrens !== undefined) {
                if (focusedItemName in responseRefetch.data.childrens) {
                    focusedItemData =
                        responseRefetch.data.childrens[focusedItemName];
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
                        className={`z-0 absolute lg:ml-20 top-44 md:top-32 left-0 right-0 lg:rounded-t-2xl duration-500 ease-in-out ${
                            isSideBarPropertiesOpen ? "lg:mr-[20vw]" : "lg:mr-6"
                        }`}
                    >
                        <div className="p-6">
                            <h5 className="z-10 pb-2">
                                <p className="bg-neutral-200 w-12 rounded-full h-5 pb-2 relative" />
                            </h5>
                            <section className="flex gap-4 w-full flex-wrap">
                                <DirectoryItemCard content="new folder" view={view} />
                                <DirectoryItemCard content="new folder" view={view} />
                            </section>
                        </div>
                    </div>
                    {/* header */}
                    <div
                        className={`z-0 fixed bg-neutral-50 lg:ml-20 lg:top-[63px] left-0 right-0 lg:rounded-t-2xl duration-500 ease-in-out ${
                            isSideBarPropertiesOpen ? "lg:mr-[20vw]" : "lg:mr-6"
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

    const { dataChildrenFolders, dataChildrenLinks } =
        sortDataToFolderAndLink(responseData, sortOption, isSortAsc);
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
                        isSideBarPropertiesOpen ? "lg:mr-[20vw]" : "lg:mr-6"
                    }`}
                >
                    <div className="p-6">
                        { view === "grid" && (
                            <h5 className="text-neutral-400 relative z-10 pb-2">
                                Folders
                            </h5>
                        )}
                        <section
                            className={`${view === "grid" ? "flex-row" : "flex-col"} flex gap-4 w-full flex-wrap pb-4`}
                        >
                            { view === "grid" && (
                                <DirectoryItemCard
                                    content="new folder"
                                    onClick={handleNewFolderClick}
                                    view={view}
                                />
                            )}
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
                                                handleDirectoryCardClick(child);
                                            }}
                                            onClick={() => {
                                                setFocusedItemData(data);
                                                setFocusedItemName(child);
                                            }}
                                            isFocused={
                                                focusedItemName === child
                                            }
                                            view={view}
                                        />
                                    );
                                }
                            )}
                        </section>

                        { view === "grid" && (
                            <h5 className="text-neutral-400 relative z-10 pt-2 pb-2">
                                Links
                            </h5>
                        )}
                        <section
                            className={`${view === "grid" ? "flex-row" : "flex-col"} flex gap-4 w-full flex-wrap`}
                        >
                            { view === "grid" && (
                                <DirectoryItemCard
                                    content="new link"
                                    onClick={handleNewLinkClick}
                                    view={view}
                                />
                            )}
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
                                        view={view}
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
                    <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center max-w-full gap-4 md:gap-0">
                        <BrowserBreadcrumb
                            onBreadcrumbClick={handleBreadcrumbClick}
                        />
                        <div className="flex flex-row items-center justify-between md:justify-end gap-2">
                            {/* LOADING */}
                            {isLoadingRefetch && <SyncingAnimation />}
                            {/* SORT */}
                            <p className="hidden md:block text-neutral-700">Sort by</p>
                            {/* DROPDOWN INPUT */}
                            <Dropdown
                                options={["Name", "Link"]}
                                // Set first letter to uppercase and replace '-' to ' '
                                // TODO: I don't think this is necessary, might convert back
                                selectedOption={sortOption.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                setSelectedOption={setSortOption}
                            />
                            {/* ASC DESC */}
                            <button className="text-neutral-700 py-1 rounded-full hover:text-neutral-900 font-normal mr-6" onClick={() => setIsSortAsc(!isSortAsc)}>
                                {isSortAsc ? 
                                    "A → Z" : "Z → A"
                                }
                            </button>
                            {/* VIEW */}
                            {/* GRID */}
                            <button
                                onClick={() => setView("grid")}
                                className={`${view === "grid" ? "bg-neutral-300" : "hover:bg-neutral-200"} p-1 rounded-md duration-100`}
                            >
                                <GridIcon />
                            </button>
                            {/* LIST */}
                            <button
                                onClick={() => setView("list")}
                                className={`${view === "list" ? "bg-neutral-300" : "hover:bg-neutral-200"} p-1  rounded-md duration-100`}
                            >
                                <ListIcon />
                            </button>
                            {/* INFO */}
                            <button
                                className="ml-4"
                                onClick={() => {
                                    setIsSideBarPropertiesOpen(
                                        !isSideBarPropertiesOpen
                                    );
                                }}
                            >
                                <InfoIcon className="h-8 w-8" aria-label="Info" />
                            </button>
                        </div>
                    </div>
                </div>
                {/* right sidebar */}
                <SideBarProperties
                    onClose={() => setIsSideBarPropertiesOpen(false)}
                    isOpen={isSideBarPropertiesOpen}
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
    console.log(input);
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
            if (sortOption === "name" && asc) {
                return a.data.title.localeCompare(b.data.title);
            } else if (sortOption === "name" && !asc) {
                return b.data.title.localeCompare(a.data.title);
            } 
        }
        if (a.data.isPinned) {
            return -1;
        }
        return 1;
    });
    dataChildrenLinks.sort((a: any, b: any) => {
        if (a.data.isPinned === b.data.isPinned) {
            if (sortOption === "name" && asc) {
                return a.data.title.localeCompare(b.data.title);
            } else if (sortOption === "name" && !asc) {
                return b.data.title.localeCompare(a.data.title);
            } else if (sortOption === "link" && asc) {
                return a.data.link.localeCompare(b.data.link);
            } else if (sortOption === "link" && !asc) {
                return b.data.link.localeCompare(a.data.link);
            }
        }
        if (a.data.isPinned) {
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
            <LoadingAnimation />
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
