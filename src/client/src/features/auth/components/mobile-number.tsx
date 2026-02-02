import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";
import { useState } from "react";
import * as React from "react";
import { useOverlayStore } from "@/stores/useOverlayStore.ts";
import { AuthApi } from "@/features/auth/api/auth.api.ts";

interface MobileNumberPageProps {
  onOtpSent: (mobileNumber: string) => void;
}

export const MobileNumber = ({ onOtpSent }: MobileNumberPageProps) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const showOverlay = useOverlayStore((store) => store.showOverlay);
  const hideOverlay = useOverlayStore((store) => store.hideOverlay);
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    showOverlay();
    e.preventDefault();
    try {
      const otpResp = await AuthApi.getOtp({ mobileNumber: mobileNumber });
      if (otpResp) {
        onOtpSent(mobileNumber);
      }
    } catch (e) {
    } finally {
      setLoading(false);
      hideOverlay();
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 max-w-4xl">
      <form onSubmit={handleSubmit} className="mx-auto max-w-lvw space-y-8">
        {/* Header & Branding */}
        <div className="space-y-4 text-center">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground px-6">
              Enter your mobile number to receive a secure verification code.
            </p>
          </div>
        </div>

        {/* Input Card */}
        <div className="bg-card rounded-2xl border p-8 shadow-sm space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <Label
                htmlFor="mobile"
                className={`text-xs font-bold uppercase tracking-widest ${loading ? "opacity-50" : "text-muted-foreground"}`}
              >
                Mobile Number
              </Label>
            </div>

            <div className="relative group">
              <Phone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
              <Input
                id="mobile"
                type="tel"
                placeholder="0000000000"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="h-16 pl-12 text-xl bg-muted/30 border-2 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all rounded-xl font-medium tracking-wider"
                disabled={loading}
                required
                autoFocus
              />
            </div>

            <div className="flex items-start gap-2 px-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground mt-0.5"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Standard message and data rates may apply. A 6-digit code will
                be sent to your device.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <Button
              type="submit"
              className="h-14 w-full text-lg font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
              disabled={loading || mobileNumber.length < 10}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span>Sending OTP...</span>
                </div>
              ) : (
                "Send Verification Code"
              )}
            </Button>

            <p className="text-center text-[11px] text-muted-foreground">
              By continuing, you agree to our{" "}
              <span className="underline cursor-pointer hover:text-primary">
                Terms of Service
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
