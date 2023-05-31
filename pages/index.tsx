import { Snackbar } from "@/components";
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
                <Snackbar className="z-50" />
            </div>
        );
    } else {
        if (isLoggedIn) {
            return (
                <>
                    <QuickCreate />
                    <Snackbar className="z-50" />
                </>
            );
        } else {
            return (
                <>
                    <Landing />
                    <Snackbar className="z-50" />
                </>
            );
        }
    }
}
