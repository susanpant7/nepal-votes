import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "@tanstack/react-router";
import { ShieldCheck, User } from "lucide-react";

const Login = () => {
    const navigate = useNavigate();

    const handleAdminLogin = async () => {
        // In reality, this would be an API call returning a JWT
        useAuthStore.getState().loginAsAdmin()
        await navigate({ to: "/admin" }); 
    };

    const handleUserLogin = async () => {
        useAuthStore.getState().loginAsUser()
        await navigate({ to: "/profile" }); 
    };

    return (
        <div className="w-full max-w-sm space-y-4 rounded-xl border bg-card p-8 shadow-2xl backdrop-blur-sm">
            <div className="grid gap-3 pt-4">
                {/* Admin Login Button */}
                <Button
                    onClick={handleAdminLogin}
                    variant="outline"
                    className="h-12 gap-2 border-primary/20 hover:bg-primary/5 hover:text-primary transition-all cursor-pointer"
                >
                    <ShieldCheck className="h-5 w-5" />
                    Login as Admin
                </Button>

                {/* Standard User Login Button */}
                <Button
                    onClick={handleUserLogin}
                    className="h-12 gap-2 shadow-lg shadow-primary/20 cursor-pointer"
                >
                    <User className="h-5 w-5" />
                    Login as Voter
                </Button>
            </div>
        </div>
    );
};

export default Login;