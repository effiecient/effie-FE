import Head from "next/head";
import LinkCard from "@/components/link-card";
import Image from "next/image";
import SideBar from "@/components/side-bar";
import { BE_BASE_URL } from "@/config/be-config";
import { useFetchEffieBE, useUserStore } from "@/hooks";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { KeyboardShortcuts, NewLink, NewFolder } from "@/components";
import { Breadcrumb } from "@/ui";
import SideBarProperties from "@/components/side-bar-properties";
import { FE_BASE_URL } from "@/config/fe-config";
import { FolderLinkData, FolderLinkDataArray } from "@/type";
import useDelayUnmount from "@/hooks/useDelayUnmount";
type BrowserType = {
    username?: string;
    location?: string[];
};
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
    const [selectedItemFullRelativePath, setSelectedItemFullRelativePath] =
        useState("");
    const handleNewLinkClick = () => {
        setIsNewLinkModalOpen(true);
    };
    const handleNewFolderClick = () => {
        setIsNewFolderModalOpen(true);
    };
    const username = useUserStore((state: any) => state.username);
    const subdomain = useUserStore((state: any) => state.subdomain);

    let showSideBar = useDelayUnmount(isSideBarPropertiesOpen, 1000);

    const { isLoading, isError, response } = useFetchEffieBE({
        url: `${BE_BASE_URL}/directory/${subdomain}/${location.join("/")}`,
    });

    if (isLoading) {
        return <>skeleton</>;
    }
    if (isError) {
        return <div>Error:{response.message}</div>;
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
                    <BrowserBreadcrumb location={location} />

                    {/* CONTENT */}
                    <div>
                        <h5 className="text-neutral-400 relative z-10">
                            Folders
                        </h5>
                        <section className="flex gap-4 w-full flex-wrap">
                            <LinkCard
                                content="new folder"
                                onClick={handleNewFolderClick}
                            />
                            {data?.childrens &&
                                Object.keys(data.childrens).map(
                                    (child: any, index) => {
                                        if (
                                            data.childrens &&
                                            data.childrens[child].type ===
                                                "folder"
                                        ) {
                                            let folder = data.childrens[child];
                                            return (
                                                <LinkCard
                                                    key={index}
                                                    content="folder"
                                                    title={folder.title}
                                                    url={folder.link}
                                                    effieUrl={folder.effieUrl}
                                                    onDoubleClick={() => {
                                                        router.push(
                                                            `/${location.join(
                                                                "/"
                                                            )}/${child}`
                                                        );
                                                    }}
                                                    onClick={() => {
                                                        let url = `${username}.${FE_BASE_URL}/${location
                                                            .concat(child)
                                                            .join("/")}`;
                                                        setLink(url);
                                                        setSelectedItemRelativePath(
                                                            child
                                                        );
                                                        setSelectedItemFullRelativePath(
                                                            location
                                                                .concat(child)
                                                                .join("/")
                                                        );
                                                        // Close only if clicked on same item
                                                        if (
                                                            compareSelectedItem(
                                                                selectedItem,
                                                                data
                                                                    .childrens?.[
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
                                                            setIsEditAccess(
                                                                false
                                                            );
                                                            // dummy data
                                                            setSelectedItem(
                                                                dummyFolderLinkData
                                                            );
                                                        } else {
                                                            setIsSideBarPropertiesOpen(
                                                                true
                                                            );
                                                            setSelectedItem(
                                                                data
                                                                    .childrens?.[
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

                        <h5 className="text-neutral-400 relative z-10">
                            Links
                        </h5>
                        <section className="flex gap-4 w-full flex-wrap">
                            <LinkCard
                                content="new link"
                                onClick={handleNewLinkClick}
                            />
                            {data?.childrens &&
                                Object.keys(data.childrens).map(
                                    (child: any, index) => {
                                        if (
                                            data.childrens &&
                                            data.childrens[child].type ===
                                                "link"
                                        ) {
                                            let link = data.childrens[child];
                                            return (
                                                <LinkCard
                                                    key={index}
                                                    content="link"
                                                    title={link.title}
                                                    url={link.link}
                                                    effieUrl={link.effieUrl}
                                                    onClick={() => {
                                                        let url = `${username}.${FE_BASE_URL}/${location
                                                            .concat(child)
                                                            .join("/")}`;
                                                        setLink(url);
                                                        setSelectedItemRelativePath(
                                                            child
                                                        );
                                                        setSelectedItemFullRelativePath(
                                                            location
                                                                .concat(child)
                                                                .join("/")
                                                        );
                                                        // Close only if clicked on same item
                                                        if (
                                                            compareSelectedItem(
                                                                selectedItem,
                                                                data
                                                                    .childrens?.[
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
                                                            setIsEditAccess(
                                                                false
                                                            );
                                                            // dummy data
                                                            setSelectedItem(
                                                                dummyFolderLinkData
                                                            );
                                                        } else {
                                                            setIsSideBarPropertiesOpen(
                                                                true
                                                            );
                                                            setSelectedItem(
                                                                data
                                                                    .childrens?.[
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
                </div>
                <div>
                    testing right sidebar
                    {/* SIDEBAR PROPERTIES */}
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

const BrowserBreadcrumb = ({ location }: { location: string[] }) => {
    const subdomain = useUserStore((state: any) => state.subdomain);
    const router = useRouter();

    return (
        <div className="top-16 flex items-center z-10">
            <Breadcrumb
                path={subdomain}
                onClick={() => {
                    router.push(`/`);
                }}
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
                    />
                </>
            )}
            {location
                .slice(window.innerWidth < 768 ? -1 : -3)
                .map((loc, index) => {
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
                            />
                        </>
                    );
                })}
        </div>
    );
};
