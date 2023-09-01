import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

import { BE_BASE_URL } from "@/config/be-config";
import { useUserStore, useFetchEffieBE, useBrowserStore } from "@/hooks";

// global
import { Navbar, RightContext, Snackbar } from "@/components";
import Page404 from "@/features/page404";

// local
import {
    BrowserHeader,
    RightSideBarProperties,
    LeftSideBar,
    NewLinkModal,
    NewFolderModal,
    DirectoryItemCard,
    DeleteConfirmationModal,
    MoveModal,
    BrowserEmptyState,
} from "./components";
import { sortDataToFolderAndLink } from "./utils/sortDataToFolderAndLink";

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
        isRightSideBarPropertiesOpen,
        focusedItemData,
        setFocusedItemData,
        setFocusedPathname,
        doRefetch,
        setDoRefetch,
        setCurrentDirectoryData,
        setIsInEditMode,
    ] = useBrowserStore(
        (state: any) => [
            state.pathname,
            state.setPathname,
            state.view,
            state.sortOption,
            state.isSortAsc,
            state.isRightSideBarPropertiesOpen,
            state.focusedItemData,
            state.setFocusedItemData,
            state.setFocusedPathname,
            state.doRefetch,
            state.setDoRefetch,
            state.setCurrentDirectoryData,
            state.setIsInEditMode,
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
        },
        refetcher,
    ] = useFetchEffieBE();

    // based on the value of isSomethingChanged, and pathname, will:
    // 1. refetch
    // 2. update window.location if pathname is different
    useEffect(() => {
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

    // handle focused item data after refetch
    // check on previous relativePath. if exist, then focus on it. else, focus on current folder
    useEffect(() => {
        if (!isLoadingRefetch) {
            let newFocusedItemData = responseRefetch?.data?.children?.find(
                (item: any) => {
                    return item.id === focusedItemData?.id;
                }
            );

            if (newFocusedItemData) {
                setFocusedItemData(newFocusedItemData);
                setFocusedPathname(pathname);
            } else {
                if (pathname === "/") {
                    setFocusedItemData(undefined);
                    setFocusedPathname(undefined);
                    setIsInEditMode(false);
                } else {
                    // focused on the folder fetched
                    setFocusedItemData(responseRefetch?.data);
                    setFocusedPathname(responseRefetch?.data?.path);
                    setIsInEditMode(false);
                }
            }

            setDoRefetch(false);
        }
    }, [isLoadingRefetch]);

    // return
    if (isError || isErrorRefetch) {
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
                <title>
                    {pathname !== "/" ? pathname.split("/").pop() : subdomain} |
                    Effie
                </title>
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
                        setFocusedPathname(undefined);
                    }}
                >
                    <div className="select-none absolute right-0 bottom-16 w-[50vw] h-[50vh]">
                        <Image
                            src={"/images/background.png"}
                            alt=""
                            fill
                            sizes="50vw"
                            priority
                            placeholder="empty"
                            style={{
                                objectFit: "contain",
                                objectPosition: "bottom right",
                            }}
                        />
                    </div>
                </div>
                {/* # CONTENT */}
                <div
                    className={`z-0 absolute lg:ml-20 top-44 md:top-32 left-0 right-0 lg:rounded-t-2xl duration-500 ease-in-out ${
                        isRightSideBarPropertiesOpen
                            ? "lg:mr-[20vw]"
                            : "lg:mr-6"
                    }`}
                >
                    {/* # FOLDER & LINK */}
                    {/* empty state */}
                    {dataChildrenFolders.length === 0 &&
                    dataChildrenLinks.length === 0 ? (
                        <BrowserEmptyState />
                    ) : (
                        // filled state
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
                                        ? "grid gap-4 grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(12rem,_1fr))]"
                                        : "flex flex-col"
                                }`}
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
                                    view === "grid"
                                        ? "grid gap-4 grid-cols-[repeat(auto-fill,_minmax(8rem,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(12rem,_1fr))]"
                                        : "flex-col"
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
                    )}
                </div>
                {/* # header */}
                {<BrowserHeader isLoadingRefetch={isLoadingRefetch} />}
                {/* # right sidebar */}
                <RightSideBarProperties />
                {/* # MODALS */}
                <NewLinkModal />
                <NewFolderModal />
                <DeleteConfirmationModal />
                <MoveModal />
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
