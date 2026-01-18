import React from "react";
import {LoadingState} from "@/components/loading/loading-state.tsx";
import {ErrorState} from "@/components/error/ErrorState.tsx";

interface QueryWrapperProps {
    isLoading: boolean;
    isError: boolean;
    refetch?: () => void;
    errorMessage?: string;
    children: React.ReactNode;
}

export const QueryWrapper: React.FC<QueryWrapperProps> = ({
                                                       isLoading,
                                                       isError,
                                                       refetch,
                                                       errorMessage,
                                                       children,
                                                   }) => {
    if (isLoading) {
        return <LoadingState />;
    }

    if (isError) {
        return (
            <ErrorState
                message={errorMessage || "Something went wrong."}
                onRetry={refetch}
            />
        );
    }

    return <>{children}</>;
};