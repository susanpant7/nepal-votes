import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound } from "lucide-react";
import { useState, useEffect } from "react";
import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useOverlayStore } from "@/stores/useOverlayStore.ts";
import { showNotification } from "@/components/toaster/toaster.utils.ts";
import { ROUTES } from "@/lib/app.routes.urls.ts";
import { UserRegistrationApi } from "@/features/users/user-registration/api/user-registration.api.ts";

interface OtpProps {
  mobileNumber: string;
}

export const RegistrationOtpForm = ({ mobileNumber }: OtpProps) => {
  const { showOverlay, hideOverlay } = useOverlayStore();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const resetTimeInSeconds = 60;
  const [timer, setTimer] = useState(resetTimeInSeconds);
  const navigate = useNavigate();

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
    e.preventDefault();

    if (otp.length < 4) {
      showNotification.warning("Please enter the full OTP code");
      return;
    }

    showOverlay();
    setLoading(true);
    try {
      await UserRegistrationApi.verifyOtp({
        mobileNumber: mobileNumber,
        providedOtp: otp,
      });

      await navigate({ to: ROUTES.HOME });
    } catch (err: any) {
      setOtp("");
    } finally {
      setLoading(false);
      hideOverlay();
    }
  };

  const handleReset = async () => {
    if (timer > 0) return;

    setLoading(true);
    try {
      await UserRegistrationApi.regenerateOtp({ mobileNumber: mobileNumber });
      showNotification.success("OTP Resent!");
      setOtp("");
      setTimer(resetTimeInSeconds);
    } catch (e) {
      // Error handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 max-w-4xl">
      <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-8">
        {/* Header & Security Icon */}
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/20 shadow-sm">
            <KeyRound className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-primary">
              Verify Identity
            </h2>
            <p className="text-sm text-muted-foreground px-6">
              For your security, we've sent a 6-digit verification code to your
              device ending in{" "}
              <span className="font-bold text-foreground">
                {mobileNumber.slice(-4).padStart(mobileNumber.length, "•")}
              </span>
            </p>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-card rounded-2xl border p-8 shadow-sm space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <Label
                htmlFor="otp"
                className={`text-xs font-bold uppercase tracking-widest ${loading ? "opacity-50" : "text-muted-foreground"}`}
              >
                One Time Password
              </Label>
              {otp.length === 6 && (
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 animate-in fade-in zoom-in">
                  READY
                </span>
              )}
            </div>

            <div className="relative group">
              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={6}
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="h-16 tracking-[1em] text-center font-mono text-2xl bg-muted/30 border-2 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all rounded-xl"
                required
                disabled={loading}
                autoFocus
              />
            </div>
            <p className="text-center text-[10px] text-muted-foreground uppercase font-semibold tracking-tighter opacity-70">
              Double check your messages if the code hasn't arrived
            </p>
          </div>

          <div className="space-y-3">
            <Button
              type="submit"
              className="h-14 w-full text-lg font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
              disabled={loading || otp.length < 6}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify & Log In"
              )}
            </Button>

            <Button
              variant="ghost"
              type="button"
              className={`w-full h-12 font-semibold transition-all ${timer === 0 ? "text-primary hover:bg-primary/5" : "text-muted-foreground"}`}
              onClick={handleReset}
              disabled={loading || timer > 0}
            >
              {timer > 0 ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="tabular-nums">Resend Code in {timer}s</span>
                </span>
              ) : (
                "Didn't receive a code? Resend"
              )}
            </Button>
          </div>
        </div>

        {/* Footer Security Hint */}
        <div className="text-center">
          <p className="text-[11px] text-muted-foreground flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Secure Multi-Factor Authentication
          </p>
        </div>
      </form>
    </div>
  );
};
