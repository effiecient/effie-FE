// export default function Footer() {
//     return <footer className="bg-primary-500 h-28"></footer>;
// }
import Image from "next/image";
import CREDITS from "@/public/images/credits.png";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white h-28 flex flex-row items-center justify-between">
            <div id="a" className="ml-8">
                <Link href="about">About!</Link>
            </div>
            <div id="b" className="shrink">
                <a href="mailto:13520004@std.stei.itb.ac.id">Contact Us</a>
            </div>
            <div id="d" className="mr-8">
                <Image src={CREDITS} alt="Images by Freepik" />
            </div>
        </footer>
    );
}
