import Image from "next/image";
import Head from "next/head";
import P404 from "../public/images/404.svg";
import Link from "next/link";

// TODO: update this to import from config only
import { FE_FULL_BASE_URL } from "@/config/fe-config";
import { Navbar } from "@/components";

export default function Page404() {
    return (
        <>
            <Head>
                <title>Effie | Link Not Found</title>
                <meta name="description" content="Link not found." />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <main className="px-6 xl:px-44 py-12 xl:py-28 flex items-center justify-center h-screen w-screen">
                <Navbar />
                <div className="flex flex-col xl:flex-row items-center justify-center h-screen w-screen">
                    <div className="relative flex justify-center w-3/5 h-3/5 select-none">
                        <Image
                            // grow image
                            fill={true}
                            src={P404}
                            alt="Link not found"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center xl:items-start">
                        <h1 className="mb-8">Link not found.</h1>
                        <p className="text-neutral-500  leading-relaxed mb-1">
                            Having trouble accessing an Effie link?
                        </p>
                        <ul className="list-disc list-outside pl-8 mb-6">
                            <li>
                                <p className="text-neutral-800 leading-relaxed ">
                                    {`Check the link to make sure it's typed
                                    correctly. Links are case-sensitive.`}
                                </p>
                            </li>
                            <li>
                                <p className="text-neutral-800 leading-relaxed ">
                                    {`You might not have the right access. In that
                                    case, contact the link owner for help.`}
                                </p>
                            </li>
                        </ul>
                        <p className="text-neutral-800 text-lg leading-relaxed">
                            {` Alternatively, let's go back to the `}
                            <Link href={`${FE_FULL_BASE_URL}`} target="_self">
                                <span className="text-primary-500 text-lg leading-relaxed underline">
                                    home page
                                </span>
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
