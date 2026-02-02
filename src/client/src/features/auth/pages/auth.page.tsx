import { SignIn } from "@/features/auth/components/sign-in.tsx";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/lib/app.routes.urls.ts";

export const AuthPage = () => {
  return (
    <div className=" w-full flex flex-col items-center justify-center bg-background px-4">
      <main className="w-full max-w-2xl">
        <div>
          <div className="w-full">
            <SignIn />
          </div>

          <div className="pt-2 border-t border-muted/50 text-center">
            <p className="text-sm text-muted-foreground font-medium">
              New user?{" "}
              <Link
                to={ROUTES.AUTH_SIGN_UP}
                className="font-black text-primary hover:underline transition-all ml-1"
              >
                Click To Register
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
