import Head from "next/head";
import { Button } from "@/ui";
// import { useState } from "react";
import Footer from "./footer";
import Image from "next/image";
import LP1 from "@/public/images/lp1.png";
import LP2 from "@/public/images/lp2.png";
import LP3 from "@/public/images/lp3.png";
import { useRegister, useWindowSize } from "@/hooks";
import { Navbar, RightContext } from "@/components";
import { useState } from "react";

export default function Landing() {
    const setIsRegisterOpen = useRegister((state) => state.setIsRegisterOpen);
    const { width } = useWindowSize();

    const [isRightContextOpen, setIsRightContextOpen] = useState(false);
    // point location
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
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

            <Navbar />
            <main className="px-16 md:px-44 xl:px-[20%] py-16">
                <div
                    className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-y-16 md:gap-y-24 md:gap-x-20 items-center justify-center"
                    onContextMenu={(e: any) => {
                        e.preventDefault();
                        console.log("hello");
                        setIsRightContextOpen(true);
                        setX(e.pageX);
                        setY(e.pageY);
                    }}
                >
                    {width ? (
                        width <= 768 && (
                            <div className="flex justify-center">
                                <Image
                                    src={LP1}
                                    alt="All your links in one place"
                                />
                            </div>
                        )
                    ) : (
                        <></>
                    )}
                    <div className="">
                        <h1 className="mb-2 md:mb-4">
                            All your links,
                            <br />
                            in one place
                        </h1>
                        <p className="text-neutral-600 text-xl mb-4 md:text-2xl md:mb-8">
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
                    {width ? (
                        width > 768 && (
                            <div className="flex justify-center">
                                <Image
                                    src={LP1}
                                    alt="All your links in one place"
                                />
                            </div>
                        )
                    ) : (
                        <></>
                    )}
                    <div className="flex justify-center">
                        <Image src={LP2} alt="Build trust with your customer" />
                    </div>
                    <div className="md:text-right">
                        <h1 className="mb-2 md:mb-4 text-3xl md:text-4xl">
                            Build trust with
                            <br />
                            your customers
                        </h1>
                        <p className="text-neutral-600 text-xl mb-4 md:text-2xl md:mb-8">
                            Establish credibility by sharing cutsom links with
                            your own brand.
                        </p>
                    </div>
                    {width ? (
                        width <= 768 && (
                            <div className="flex justify-center">
                                <Image src={LP3} alt="Simplify how you share" />
                            </div>
                        )
                    ) : (
                        <></>
                    )}
                    <div className="">
                        <h1 className="mb-2 md:mb-4">
                            Simplify how
                            <br />
                            you share
                        </h1>
                        <p className="text-neutral-600 text-xl mb-4 md:text-2xl md:mb-8">
                            Share shorter links with your colleagues and
                            friends.
                        </p>
                    </div>
                    {width ? (
                        width > 768 && (
                            <div className="flex justify-center">
                                <Image src={LP3} alt="Simplify how you share" />
                            </div>
                        )
                    ) : (
                        <></>
                    )}
                </div>
            </main>
            <RightContext
                isOpen={isRightContextOpen}
                onClose={() => setIsRightContextOpen(false)}
                x={x}
                y={y}
                options={{
                    title: "hello",
                    onClick: () => console.log("hello"),
                }}
            />
            <Footer />
        </>
    );
}
