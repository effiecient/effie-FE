import { Navbar } from "@/components";
import Image from "next/image";
import Head from "next/head";
import P404 from "../public/images/404.png";
import Link from "next/link";

// TODO: update this to import from config only
import {
    FE_FULL_BASE_URL,
} from "@/config/fe-config";

export default function Page404() {
    return (
        <>
            <Head>
                <title>Effie | Link Not Found</title>
                <meta
                    name="description"
                    content="Link not found."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.svg" />
            </Head>

            <Navbar />
            <main className="px-44 xl:px-[10%] py-28">
            <div className="grid grid-cols-2 grid-rows-1 gap-x-10 items-center justify-center">
                <div className="flex justify-center">
                    <Image src={P404} alt="Link not found" />
                </div>
                <div className="">
                        <h1 className="mb-8">
                            Link not found.
                        </h1>
                        <p className="text-neutral-500 text-xl leading-relaxed mb-1">
                            Having trouble accessing an Effie link?
                        </p>
                            <ul className="list-disc list-outside pl-8 mb-6">
                                <li><p className="text-neutral-800 text-xl leading-relaxed ">Check the link to make sure it's typed correctly. Links are case-sensitive.</p></li>
                                <li><p className="text-neutral-800 text-xl leading-relaxed ">You might not have the right access. In that case, contact the link owner for help.</p> </li>
                            </ul>
                        <p className="text-neutral-800 text-xl leading-relaxed">
                            Alternatively, let's go back to the&nbsp;
                            <Link href={`${FE_FULL_BASE_URL}`} target="_self">
                                <span className="text-primary-500 text-xl leading-relaxed underline">home page</span>
                            </Link>.
                        </p>
                    </div>
            </div>
            </main>
        </>
    );
}