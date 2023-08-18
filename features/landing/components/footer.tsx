import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white h-28 flex flex-row items-center justify-between p-8">
            <div id="a" className="">
                <Link href="about">About</Link>
            </div>
        </footer>
    );
}
