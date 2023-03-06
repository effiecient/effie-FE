import { Browser, Landing } from "@/features";
import QuickCreate from "@/features/quick-create";
import { useUserStore } from "@/hooks";
export default function Index() {
    const isLoggedIn = useUserStore((state: any) => state.isLoggedIn);
    const isSubdomain = useUserStore((state: any) => state.isSubdomain);

    if (isSubdomain) {
        return <Browser />;
    } else {
        if (isLoggedIn) {
            return <QuickCreate />;
        } else {
            return <Landing />;
        }
    }
}
