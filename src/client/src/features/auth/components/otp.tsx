import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KeyRound } from "lucide-react"
import { useState, useEffect } from "react"
import * as React from "react"
import { useAuthStore } from "@/stores/useAuthStore"
import { useNavigate } from "@tanstack/react-router"
import { Spinner } from "@/components/ui/spinner.tsx";
import {useOverlayStore} from "@/stores/useOverlayStore.ts";
import {showNotification} from "@/components/toaster/toaster.utils.ts";
import {AuthApi} from "@/features/auth/api/auth.api.ts";
import {ROUTES} from "@/lib/app.routes.urls.ts";

interface OtpProps {
    mobileNumber: string
    resendOtp: () => void
}

export const Otp = ({ mobileNumber, resendOtp }: OtpProps) => {
    const {showOverlay,hideOverlay} = useOverlayStore();
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const resetTimeInSeconds = 60;
    const [timer, setTimer] = useState(resetTimeInSeconds) 
    const navigate = useNavigate()

    useEffect(() => {
        let interval: number | undefined; 

        if (timer > 0) {
            interval = window.setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timer]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (otp.length < 4) {
            showNotification.warning("Please enter the full OTP code");
            return;
        }
        
        showOverlay()
        setLoading(true)
        try {
            const tokenResp = await AuthApi.login({
                mobileNumber: mobileNumber,
                providedOtp: otp
            })
            useAuthStore.getState().login(tokenResp.accessToken)
            showNotification.success("Successfully logged in")
            await navigate({ to: ROUTES.USER_PROFILE as any })
        } catch (err: any) {
            setOtp("")
        } finally {
            setLoading(false)
            hideOverlay()
        }
    }

    const handleReset = async () => {
        if (timer > 0) return;

        setLoading(true)
        try {
            await AuthApi.getOtp({ mobileNumber: mobileNumber })
            showNotification.success("OTP Resent!");
            setOtp("");
            setTimer(resetTimeInSeconds); 
        } catch (e) {
            // Error handled by interceptor
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1 text-center">
                <h2 className="text-xl font-semibold tracking-tight">
                    Verify Identity
                </h2>
                <p className="text-sm text-muted-foreground">
                    We've sent a code to <span className="font-medium text-foreground">{mobileNumber}</span>
                </p>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="otp" className={loading ? "opacity-70" : ""}>
                        One Time Password
                    </Label>
                    <button
                        type="button"
                        onClick={resendOtp}
                        className="text-xs text-primary hover:underline font-medium"
                    >
                        Change Number?
                    </button>
                </div>
                <div className="relative">
                    <KeyRound className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="otp"
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        maxLength={6}
                        placeholder="••••••"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        className="pl-10 h-12 tracking-[0.5em] text-center font-mono text-lg"
                        required
                        disabled={loading}
                        autoFocus
                    />
                </div>
            </div>

            <div className="space-y-3">
                <Button type="submit" className="h-12 w-full" disabled={loading || otp.length < 4}>
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <Spinner className="size-5 animate-spin" />
                            <span>Verifying...</span>
                        </div>
                    ) : (
                        "Verify & Log In"
                    )}
                </Button>

                <Button
                    variant="ghost"
                    type="button"
                    className="w-full text-muted-foreground transition-all"
                    onClick={handleReset}
                    disabled={loading || timer > 0}
                >
                    {timer > 0 ? `Resend Code in ${timer}s` : "Resend Code"}
                </Button>
            </div>
        </form>
    )
}