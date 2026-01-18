import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

export const ErrorState = ({
                               title = "Something went wrong",
                               message = "We couldn’t load the data. Please try again.",
                               onRetry,
                           }: ErrorStateProps) => {
    return (
        <div className="p-6">
            <div className="flex flex-col items-center justify-center rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center space-y-3">
                <AlertCircle className="h-8 w-8 text-destructive" />

                <h3 className="text-sm font-semibold text-destructive">
                    {title}
                </h3>

                <p className="text-sm text-muted-foreground">
                    {message}
                </p>

                {onRetry && (
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={onRetry}
                    >
                        Retry
                    </Button>
                )}
            </div>
        </div>
    );
};
