import Head from "next/head";
import LinkCard from "@/components/link-card";
import Image from "next/image";

export default function Browser() {
    return (
        <>
        <Head>
            <title>Effie</title>
            <meta name="description" content="All your links, in one place." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="bg-white flex w-full min-h-screen relative">
            {/* SIDEBAR */}
            <nav className="bg-white sticky top-0 left-0 w-12">

            </nav>
            {/* BROWSER */}
            <div className="flex flex-col gap-6 flex-grow bg-neutral-50 min-h-full w-full rounded-tl-2xl p-12">
                <div className="fixed right-0 bottom-0 w-[50vw] h-[70vh] opacity-50">
                    <Image src={"/images/background.png"} alt="" fill style={{objectFit: "contain", objectPosition: "right"}} />
                </div>
                <h5 className="text-neutral-400">Folders</h5>
                <section className="flex gap-4 w-full flex-wrap">
                    <LinkCard title="Folder 1" url="https://google.com" />
                    <LinkCard title="Folder 1" url="https://google.com" />
                    <LinkCard title="Folder 1" url="https://google.com" />
                    <LinkCard title="Folder 1" url="https://google.com" />
                </section>
                <h5 className="text-neutral-400">Links</h5>
                <section className="grid grid-cols-4">

                </section>
            </div>
        </main>
        </>
    );
}
