import { Navbar } from "@/components";
import Link from "next/link";

export function About() {
    return (
        <>
            <Navbar isOnLanding />
            <div className="m-6">
                <p className="text-xl mb-4">hi there!</p>
                <div className="text-lg">
                    <p className="text-lg mb-4">
                        {`thank you for reading this <3, much love to you. `}
                    </p>
                    <p className="text-lg mb-4">
                        This tool is created by{" "}
                        <Link
                            href="https://feliciasutandijo.my.id/"
                            className="text-primary-500 hover:underline text-lg"
                        >
                            feli
                        </Link>
                        ,{" "}
                        <Link
                            href="https://www.christojeffrey.com/"
                            className="text-primary-500 hover:underline text-lg"
                        >
                            jeff
                        </Link>
                        ,{" "}
                        <Link
                            href="https://www.instagram.com/gedeprasidha/"
                            className="text-primary-500 hover:underline text-lg"
                        >
                            gede
                        </Link>
                        ,{" "}
                        <Link
                            href="https://www.afanhandoyo.com/"
                            className="text-primary-500 hover:underline text-lg"
                        >
                            afan
                        </Link>
                        ,{" and "}
                        <Link
                            href="https://www.linkedin.com/in/adityaprawiranugroho"
                            className="text-primary-500 hover:underline text-lg"
                        >
                            adit
                        </Link>
                        .
                    </p>
                    <p className="text-lg  mb-4 mt-6">
                        tho it was a rushed school project, we hope you find
                        this tool useful to you.
                    </p>
                    <p className="text-lg">
                        {`please contact us! we'd love to hear your feedbacks and
                        suggestions; or just to say hi :) `}
                    </p>
                </div>
            </div>
        </>
    );
}
