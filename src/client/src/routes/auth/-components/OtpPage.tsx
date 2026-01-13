import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KeyRound } from "lucide-react"
import { useState, useEffect } from "react"
import * as React from "react"
import { useAuthStore } from "@/stores/useAuthStore"
import { useNavigate } from "@tanstack/react-router"
import { Spinner } from "@/components/ui/spinner.tsx";
import { notify } from "@/lib/notifications";
import AuthApi from "@/routes/auth/-api/auth-api.ts";

interface OtpPageProps {
    mobileNumber: string
    resendOtp: () => void
}

const OtpPage = ({ mobileNumber, resendOtp }: OtpPageProps) => {
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const resetTimeInSeconds = 6;
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
            notify.warning("Please enter the full OTP code");
            return;
        }

        setLoading(true)
        try {
            const tokenResp = await AuthApi.login({
                mobileNumber: mobileNumber,
                providedOtp: otp
            })

            notify.success("Successfully logged in")
            await navigate({ to: '/profile' as any })
        } catch (err: any) {
            setOtp("")
        } finally {
            setLoading(false)
        }
    }

    const handleReset = async () => {
        if (timer > 0) return;

        setLoading(true)
        try {
            await AuthApi.getOtp({ mobileNumber: mobileNumber })
            notify.success("OTP Resent!");
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

export default OtpPage