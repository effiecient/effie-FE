import { Navbar } from "@/components";
import Link from "next/link";

export function About() {
    return (
        <>
            <Navbar isOnLanding />
            <div className="m-6">
                <p className="text-xl mb-4">about!</p>
                <div className="text-lg">
                    <p className="text-lg mb-4">
                        {`helo! first of all, thank you for reading this <3, much love to you. `}
                    </p>
                    <p className="text-lg mb-4">
                        This tools is created by created by{" "}
                        <Link
                            href="https://www.christojeffrey.com/"
                            className="text-primary-500 hover:underline text-lg"
                        >
                            jeff
                        </Link>
                        ,{" "}
                        <Link
                            href="https://feliciasutandijo.my.id/"
                            className="text-primary-500 hover:underline text-lg"
                        >
                            feli
                        </Link>
                        ,{" "}
                        <Link
                            href=""
                            className="text-primary-500 hover:underline text-lg"
                        >
                            gede
                        </Link>
                        ,{" "}
                        <Link
                            href=""
                            className="text-primary-500 hover:underline text-lg"
                        >
                            afan
                        </Link>
                        ,{" and "}
                        <Link
                            href=""
                            className="text-primary-500 hover:underline text-lg"
                        >
                            adit
                        </Link>
                        .
                    </p>
                    <p className="text-lg  mb-4">
                        tho it was a rushed school project, we hope you find
                        this tool useful to you.
                    </p>
                </div>
            </div>
        </>
    );
}
