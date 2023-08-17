// export default function Footer() {
//     return <footer className="bg-primary-500 h-28"></footer>;
// }
import Image from "next/image";
import CREDITS from "@/public/images/credits.png";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white h-28 flex flex-row items-center justify-between p-8">
            <div id="a" className="">
                <Link href="about">about</Link>
            </div>
            <div id="b" className="shrink">
                <a href="mailto:13520004@std.stei.itb.ac.id">Contact Us</a>
            </div>
        </footer>
    );
}
