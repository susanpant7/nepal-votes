import { Button } from "@/components/ui/button";
import {
  type ErrorComponentProps,
  Link,
  useRouter,
} from "@tanstack/react-router";
import { AlertCircle, Home, RotateCcw } from "lucide-react";
import { ROUTES } from "@/lib/app.routes.urls.ts";

export const ErrorFallbackPage = ({ error, reset }: ErrorComponentProps) => {
  const router = useRouter();

  return (
    <div className="flex min-h-100 flex-col items-center justify-center gap-6 rounded-xl p-12 text-center animate-in fade-in zoom-in-95 duration-300">
      {/* Icon for visual weight */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="h-6 w-6" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          Something went wrong!
        </h3>
        <p className="mx-auto max-w-xs text-sm text-muted-foreground">
          {error.message ||
            "An unexpected error occurred while loading this section."}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>

        <Button asChild variant="outline" className="gap-2">
          <Link to={ROUTES.HOME}>
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
};
