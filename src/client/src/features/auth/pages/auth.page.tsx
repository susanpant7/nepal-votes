import { SignIn } from "@/features/auth/components/sign-in.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/lib/app.routes.urls.ts";

export const AuthPage = () => {
  return (
    <div className="flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-black tracking-tight">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignIn />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-2">
          <div className="text-sm text-center text-muted-foreground w-full">
            New user?{" "}
            <Link
              to={ROUTES.AUTH_SIGN_UP}
              className="font-bold text-primary hover:underline transition-all"
            >
              Create an account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
