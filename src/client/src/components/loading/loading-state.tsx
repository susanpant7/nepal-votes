import {Skeleton} from "@/components/ui/skeleton.tsx";

export const LoadingState = () => {
    return (
        <div className="space-y-3 p-6">
            <Skeleton className="h-31.25 w-full rounded-xl" />
            <Skeleton className="h-8 w-62.5" />
            <Skeleton className="h-8 w-full" />
        </div>
    );
};