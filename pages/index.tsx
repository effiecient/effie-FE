import { Browser, Landing } from "@/features";
import { useUserStore } from "@/hooks";

export default function Index() {
    const isLoggedIn = useUserStore((state: any) => state.isLoggedIn);

    if (isLoggedIn) {
        return <Browser />;
    }
    return <Landing />;
}
