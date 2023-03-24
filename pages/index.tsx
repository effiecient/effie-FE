import { Navbar } from "@/components";
import { Browser, Landing } from "@/features";
import QuickCreate from "@/features/quick-create";
import { useUserStore } from "@/hooks";
export default function Index() {
    const isLoggedIn = useUserStore((state: any) => state.isLoggedIn);
    const isSubdomain = useUserStore((state: any) => state.isSubdomain);
    console.log("process.env.VERCEL_ENV");
    console.log(process.env.VERCEL_ENV);
    console.log("process.env.NODE_ENV");
    console.log(process.env.NODE_ENV);
    if (isSubdomain) {
        return (
            <>
                <Navbar />
                <Browser />
            </>
        );
    } else {
        if (isLoggedIn) {
            return <QuickCreate />;
        } else {
            return <Landing />;
        }
    }
}
