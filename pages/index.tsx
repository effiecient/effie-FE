// import { Navbar } from "@/components";
import { Browser, Landing } from "@/features";
import QuickCreate from "@/features/quick-create";
import { useUserStore } from "@/hooks";
export default function Index() {
    const isLoggedIn = useUserStore((state: any) => state.isLoggedIn);
    const isSubdomain = useUserStore((state: any) => state.isSubdomain);

    if (isSubdomain) {
        return (
            <div className="flex h-full w-full flex-col">
                <Browser />
            </div>
        );
    } else {
        if (isLoggedIn) {
            return <QuickCreate />;
        } else {
            return <Landing />;
        }
    }
}
