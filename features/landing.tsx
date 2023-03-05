import Head from "next/head";
import Button from "@/components/button";
import { useState } from "react";
import Footer from "@/components/footer";
import Image from "next/image";
import LP1 from "../public/images/lp1.png";
import LP2 from "../public/images/lp2.png";
import LP3 from "../public/images/lp3.png";
import { useRegister } from "@/hooks";
import Navbar from "@/components/navbar";

export default function Landing() {
    const isRegisterOpen = useRegister((state) => state.isRegisterOpen);
    const setIsRegisterOpen = useRegister((state) => state.setIsRegisterOpen);
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

            <Navbar />
            <main className="px-44 xl:px-[20%] py-32">
                <div className="grid grid-cols-2 grid-rows-3 gap-y-24 gap-x-20 items-center justify-center">
                    <div className="">
                        <h1 className="mb-4">All your links,<br />in one place</h1>
                        <p className="text-neutral-600 text-2xl mb-8">
                            Keep your links with folders and custom URLs with
                            Effie.
                        </p>
                        <Button
                            className="px-4 py-3 text-base"
                            onClick={() => setIsRegisterOpen(true)}
                        >
                            Get Started Now &nbsp;&nbsp;&gt;
                        </Button>
                    </div>
                    <div className="flex justify-center">
                        <Image src={LP1} alt="All your links in one place" />
                    </div>
                    <div className="flex justify-center">
                        <Image src={LP2} alt="Build trust with your customer" />
                    </div>
                    <div className="text-right">
                        <h1 className="mb-4">Build trust with<br />your customers</h1>
                        <p className="text-neutral-600 text-2xl">
                            Establish credibility by sharing cutsom links with
                            your own brand.
                        </p>
                    </div>
                    <div className="">
                        <h1 className="mb-4">Simplify how<br />you share</h1>
                        <p className="text-neutral-600 text-2xl">
                            Share shorter links with your colleagues and
                            friends.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <Image src={LP3} alt="Simplify how you share" />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}