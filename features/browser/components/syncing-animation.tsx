import { LoadingAnimation } from "@/ui";

export function SyncingAnimation() {
    // make the dot animate
    return (
        <h6 className="text-primary-600 animate-pulse md:mx-6">
            <LoadingAnimation bg="rgb(var(--color-neutral-900))" />
        </h6>
    );
}
