import Head from "next/head";
import LinkCard from "@/components/link-card";
import Image from "next/image";
import SideBar from "@/components/side-bar";
import { BE_BASE_URL } from "@/config/be-config";
import { useFetchEffieBE, useUserStore } from "@/hooks";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import { useState } from "react";
import NewLink from "@/components/create-modal/new-link";
import NewFolder from "@/components/create-modal/new-folder";
type BrowserType = {
    username?: string;
    location?: string[];
};

export default function Browser({ location = [] }: BrowserType) {
    const router = useRouter();
    const [isNewLinkModalOpen, setIsNewLinkModalOpen] = useState(false);
    const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
    const handleNewLinkClick = () => {
        setIsNewLinkModalOpen(true);
    };
    const handleNewFolderClick = () => {
        setIsNewFolderModalOpen(true);
    };
    const username = useUserStore((state: any) => state.username);

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

    const data: {
        type: string;
        childrens?: {
            title: string;
            isPinned: boolean;
            link: string;
            type: string;
            effieUrl: string;
        }[];
    } = response.data;

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

            <main className="bg-white flex w-full min-h-screen relative">
                {/* SIDEBAR */}
                <SideBar />
                {/* BROWSER Loader*/}
                <div className="flex flex-col gap-6 flex-grow bg-neutral-50 min-h-full w-full rounded-tl-2xl p-12">
                    {/* breadcrumbs */}
                    <div className="flex gap-2">
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
                    </div>
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
                    <h5 className="text-neutral-400">Folders</h5>
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
                                                onClick={() => {
                                                    console.log("clicked");
                                                    // push append to current location
                                                    router.push(
                                                        `/${location
                                                            .concat(child)
                                                            .join("/")}`
                                                    );
                                                }}
                                            />
                                        );
                                    }
                                }
                            )}
                    </section>
                    <h5 className="text-neutral-400">Links</h5>
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
                                            />
                                        );
                                    }
                                }
                            )}
                    </section>
                </div>
            </main>
            {/* modal */}
            <NewLink
                isOpen={isNewLinkModalOpen}
                onClose={() => setIsNewLinkModalOpen(false)}
            />
            <NewFolder
                isOpen={isNewFolderModalOpen}
                onClose={() => setIsNewFolderModalOpen(false)}
            />
        </>
    );
}
