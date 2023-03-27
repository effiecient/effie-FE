import Head from "next/head";
import LinkCard from "@/components/link-card";
import Image from "next/image";
import SideBar from "@/components/side-bar";
import { BE_BASE_URL } from "@/config/be-config";
import { useFetchEffieBE, useUserStore } from "@/hooks";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NewLink from "@/components/create-modal/new-link";
import NewFolder from "@/components/create-modal/new-folder";
import KeyboardShortcuts from "@/components/accessibilities/keyboard-shortcuts";
import Breadcrumb from "@/components/breadcrumb";
import SideBarProperties from "@/components/side-bar-properties";
import { FE_BASE_URL } from "@/config/fe-config";
import { FolderLinkData, FolderLinkDataArray } from "@/type";
import useDelayUnmount from "@/hooks/useDelayUnmount";
type BrowserType = {
    username?: string;
    location?: string[];
};

function compareSelectedItem(a: FolderLinkData, b: FolderLinkData): boolean {
    if (a.type !== b.type) {
        return false;
    }
    return a.title === b.title && a.effieUrl === b.effieUrl;
}

export default function Browser({ location = [] }: BrowserType) {
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
    const [isNewLinkModalOpen, setIsNewLinkModalOpen] = useState(false);
    const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
    const [isKeyboardShortcutsModalOpen, setIsKeyboardShortcutsModalOpen] =
        useState(false);
    const [isSideBarPropertiesOpen, setIsSideBarPropertiesOpen] =
        useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isEditAccess, setIsEditAccess] = useState(false);
    const [link, setLink] = useState("");
    const [selectedItem, setSelectedItem] = useState({} as FolderLinkData);
    const [selectedItemRelativePath, setSelectedItemRelativePath] =
        useState("");
    const [selectedItemFullRelativePath, setSelectedItemFullRelativePath] = useState("");
    const handleNewLinkClick = () => {
        setIsNewLinkModalOpen(true);
    };
    const handleNewFolderClick = () => {
        setIsNewFolderModalOpen(true);
    };
    const username = useUserStore((state: any) => state.username);

    let showSideBar = useDelayUnmount(isSideBarPropertiesOpen, 1000);

    const dummyFolderLinkData: FolderLinkData = {
        title: "",
        isPinned: false,
        link: "",
        type: "folder",
        effieUrl: "",
        shareConfiguration: {
            isShared: false,
            sharedPrivilege: "read",
        },
    };

    const { isLoading, isError, response } = useFetchEffieBE({
        url: `${BE_BASE_URL}/directory/${username}/${location.join("/")}`,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }

    if (response.status === "ERROR") {
        return <div>{response.message}</div>;
    }

    const data: FolderLinkDataArray = response.data;

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
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="bg-white flex w-full flex-grow relative">
                {/* SIDEBAR */}
                <SideBar 
                    handleNewLinkClick={handleNewLinkClick}
                    handleNewFolderClick={handleNewFolderClick}
                />

                {/* BROWSER */}
                {/* <div className="flex flex-col gap-6 flex-grow min-h-full w-full rounded-tl-2xl lg:ml-20 p-12 relative pb-28 lg:pb-12"> */}
                    
                {/* {/* BROWSER */}
                <div
                    className={`flex flex-col gap-6 flex-grow min-h-full w-full rounded-tl-2xl lg:ml-20 ${
                        isSideBarPropertiesOpen
                            ? "flex-wrap pr-48 lg:pr-72"
                            : "pr-12"
                    } py-12 pl-12 w-full rounded-tl-2xl`}
                >
                    {/* BACKGROUND */}
                    <div className="w-full min-h-full fixed top-16 left-0 lg:left-20 bg-neutral-50 rounded-tl-2xl z-0" /> 
                    {/* breadcrumbs */}
                    {/* <div className="flex gap-2">
                        {[username].concat(location).map((loc, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex gap-2 items-center"
                                >
                                    {index !== 0 && (
                                        <p className="text-neutral-400">/</p>
                                    )}
                                    <p
                                        className="text-neutral-400 hover:cursor-pointer hover:text-neutral-500"
                                        onClick={() => {
                                            router.push(
                                                `/${location
                                                    .slice(0, index)
                                                    .join("/")}`
                                            );
                                        }}
                                    >
                                        {loc}
                                    </p>
                                </div>
                            );
                        })}
                    </div> */}
                    <div className="fixed right-0 bottom-0 w-[50vw] h-[70vh]">
                        <Image
                            src={"/images/background.png"}
                            alt=""
                            fill
                            style={{
                                objectFit: "contain",
                                objectPosition: "right",
                            }}
                        />
                    </div>

                    {/* BREADCRUMBS */}
                    <div className="sticky top-16 w-full bg-neutral-50 flex items-center z-20 -ml-4 -mt-4">
                        <Breadcrumb 
                            path={username} 
                            onClick={() => {
                                router.push(`/`);
                            }}
                        />
                        { ((window.innerWidth < 768 && location.length > 1) || 
                            (window.innerWidth >= 768 && location.length > 3)) && 
                            (<>
                                <p className="text-neutral-300">/</p>
                                <Breadcrumb path="..." onClick={() => {
                                    router.push(
                                        `/${location
                                            .slice(0, window.innerWidth < 768 ? -1 : -3)
                                            .join("/")}`
                                    );
                                }} />
                            </>)
                        }
                        { location.slice(window.innerWidth < 768 ? -1 : -3).map((loc, index) => {
                            return (
                                <>
                                    <p className="text-neutral-300">/</p>
                                    <Breadcrumb
                                        path={loc}
                                        onClick={() => {
                                            router.push(
                                                `/${location
                                                    .slice(0, index+1)
                                                    .join("/")}`
                                            );
                                        }}
                                    />
                                </>
                            );
                        })}
                    </div>

                    {/* CONTENT */}
                    <h5 className="text-neutral-400 relative z-10">Folders</h5>
                    <section className="flex gap-4 w-full flex-wrap">
                        <LinkCard
                            content="new folder"
                            onClick={handleNewFolderClick}
                        />
                        {data &&
                            data.childrens &&
                            Object.keys(data.childrens).map(
                                (child: any, index) => {
                                    if (
                                        data.childrens &&
                                        data.childrens[child].type === "folder"
                                    ) {
                                        return (
                                            <LinkCard
                                                key={index}
                                                content="folder"
                                                title={
                                                    data.childrens[child].title
                                                }
                                                url={data.childrens[child].link}
                                                effieUrl={
                                                    data.childrens[child]
                                                        .effieUrl
                                                }
                                                // onClick={() => {
                                                //     router.push(`/${location.join("/")}/${child}`);
                                                // }}
                                                onClick={() => {
                                                    let url = `${username}.${FE_BASE_URL}/${location
                                                        .concat(child)
                                                        .join("/")}`;
                                                    setLink(url);
                                                    setSelectedItemRelativePath(
                                                        child
                                                    );
                                                    setSelectedItemFullRelativePath(location
                                                        .concat(child)
                                                        .join("/"))
                                                    // Close only if clicked on same item
                                                    if (
                                                        compareSelectedItem(
                                                            selectedItem,
                                                            data.childrens?.[
                                                                child
                                                            ] ??
                                                                dummyFolderLinkData
                                                        ) &&
                                                        isSideBarPropertiesOpen
                                                    ) {
                                                        setIsSideBarPropertiesOpen(
                                                            !isSideBarPropertiesOpen
                                                        );
                                                        setIsEdit(false);
                                                        setIsEditAccess(false);
                                                        // dummy data
                                                        setSelectedItem(
                                                            dummyFolderLinkData
                                                        );
                                                    } else {
                                                        setIsSideBarPropertiesOpen(
                                                            true
                                                        );
                                                        setSelectedItem(
                                                            data.childrens?.[
                                                                child
                                                            ] ??
                                                                dummyFolderLinkData
                                                        );
                                                    }
                                                }}
                                                onClick={() => {
                                                    let url = `${username}.${FE_BASE_URL}/${location
                                                        .concat(child)
                                                        .join("/")}`;
                                                    setLink(url);
                                                    setSelectedItemRelativePath(
                                                        child
                                                    );
                                                    setSelectedItemFullRelativePath(location
                                                        .concat(child)
                                                        .join("/"))
                                                    // Close only if clicked on same item
                                                    if (
                                                        compareSelectedItem(
                                                            selectedItem,
                                                            data.childrens?.[
                                                                child
                                                            ] ??
                                                                dummyFolderLinkData
                                                        ) &&
                                                        isSideBarPropertiesOpen
                                                    ) {
                                                        setIsSideBarPropertiesOpen(
                                                            !isSideBarPropertiesOpen
                                                        );
                                                        setIsEdit(false);
                                                        setIsEditAccess(false);
                                                        // dummy data
                                                        setSelectedItem(
                                                            dummyFolderLinkData
                                                        );
                                                    } else {
                                                        setIsSideBarPropertiesOpen(
                                                            true
                                                        );
                                                        setSelectedItem(
                                                            data.childrens?.[
                                                                child
                                                            ] ??
                                                                dummyFolderLinkData
                                                        );
                                                    }
                                                }}
                                            />
                                        );
                                    }
                                }
                            )}
                    </section>
                    <h5 className="text-neutral-400 relative z-10">Links</h5>
                    <section className="flex gap-4 w-full flex-wrap">
                        <LinkCard
                            content="new link"
                            onClick={handleNewLinkClick}
                        />
                        {data &&
                            data.childrens &&
                            Object.keys(data.childrens).map(
                                (child: any, index) => {
                                    if (
                                        data.childrens &&
                                        data.childrens[child].type === "link"
                                    ) {
                                        return (
                                            <LinkCard
                                                key={index}
                                                content="link"
                                                title={
                                                    data.childrens[child].title
                                                }
                                                url={data.childrens[child].link}
                                                effieUrl={
                                                    data.childrens[child]
                                                        .effieUrl
                                                }
                                                onClick={() => {
                                                    let url = `${username}.${FE_BASE_URL}/${location
                                                        .concat(child)
                                                        .join("/")}`;
                                                    setLink(url);
                                                    setSelectedItemRelativePath(
                                                        child
                                                    );
                                                    setSelectedItemFullRelativePath(location
                                                        .concat(child)
                                                        .join("/"))
                                                    // Close only if clicked on same item
                                                    if (
                                                        compareSelectedItem(
                                                            selectedItem,
                                                            data.childrens?.[
                                                                child
                                                            ] ??
                                                                dummyFolderLinkData
                                                        ) &&
                                                        isSideBarPropertiesOpen
                                                    ) {
                                                        setIsSideBarPropertiesOpen(
                                                            !isSideBarPropertiesOpen
                                                        );
                                                        setIsEdit(false);
                                                        setIsEditAccess(false);
                                                        // dummy data
                                                        setSelectedItem(
                                                            dummyFolderLinkData
                                                        );
                                                    } else {
                                                        setIsSideBarPropertiesOpen(
                                                            true
                                                        );
                                                        setSelectedItem(
                                                            data.childrens?.[
                                                                child
                                                            ] ??
                                                                dummyFolderLinkData
                                                        );
                                                    }
                                                }}
                                            />
                                        );
                                    }
                                }
                            )}
                    </section>
                </div>
                {/* SIDEBAR PROPERTIES */}
                {showSideBar && (
                    <SideBarProperties
                        isOpen={isSideBarPropertiesOpen}
                        itemData={selectedItem}
                        isEdit={isEdit}
                        isEditAccess={isEditAccess}
                        setIsEdit={setIsEdit}
                        setIsEditAccess={setIsEditAccess}
                        link={link}
                        relativePath={selectedItemRelativePath}
                        fullRelativePath={selectedItemFullRelativePath}
                        onClose={() => {
                            setIsSideBarPropertiesOpen(false);
                        }}
                    />
                )}
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
