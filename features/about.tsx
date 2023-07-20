import { Navbar } from "@/components";

export function About() {
    return (
        <>
            <Navbar isOnLanding />
            <div className="m-6">
                <p className="text-xl mb-4">about!</p>
                <p className="text-lg">
                    {`helo! first of all, thank you for reading this <3, much love to you. `}
                </p>
            </div>
        </>
    );
}
