import Head from "next/head";
import LinkCard from "@/components/link-card";
import Image from "next/image";
import SideBar from "@/components/side-bar";
import { BASE_URL } from "@/config/be-config";
import { useFetchEffieBE } from "@/hooks";
import Navbar from "@/components/navbar";

export default function Browser() {
    const { isLoading, isError, respond } = useFetchEffieBE(
        `${BASE_URL}/directory/christojeffrey/`,
        "GET"
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error</div>;
    }

    const data: {
        childrens: {
            title: string;
            isPinned: boolean;
            link: string;
            type: string;
            effieUrl: string;
        }[];
    } = respond.data;

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

            <Navbar isOnLanding />
            <main className="bg-white flex w-full min-h-screen relative">
                {/* SIDEBAR */}
                <SideBar />
                {/* BROWSER */}
                <div className="flex flex-col gap-6 flex-grow bg-neutral-50 min-h-full w-full rounded-tl-2xl p-12">
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
                        <LinkCard content="new folder" />
                        {data &&
                            Object.keys(data.childrens).map(
                                (child: any, index) => {
                                    if (
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
                                            />
                                        );
                                    }
                                }
                            )}
                    </section>
                    <h5 className="text-neutral-400">Links</h5>
                    <section className="flex gap-4 w-full flex-wrap">
                        <LinkCard content="new link" />
                        {data &&
                            Object.keys(data.childrens).map(
                                (child: any, index) => {
                                    if (data.childrens[child].type === "link") {
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
        </>
    );
}
