import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MoveLeft, FileQuestion } from "lucide-react";

export const NotFoundPage = () => {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
            {/* Visual Element */}
            <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-muted">
                <FileQuestion className="h-12 w-12 text-muted-foreground" />
                <div className="absolute -right-2 -top-2 flex h-8 w-8 animate-bounce items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    404
                </div>
            </div>

            {/* Text Content */}
            <div className="max-w-md space-y-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Lost in space?
                </h1>
                <p className="text-base text-muted-foreground">
                    The page you are looking for doesn't exist or has been moved.
                    Don't worry, even the best explorers get lost sometimes.
                </p>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="default" size="lg" className="h-12 px-8">
                    <Link to="/">
                        <MoveLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="h-12 px-8">
                    <a href="mailto:susan.pant7@gmail.com">
                        Report Issue
                    </a>
                </Button>
            </div>

            {/* Subtle Background Decoration */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
        </div>
    );
};
