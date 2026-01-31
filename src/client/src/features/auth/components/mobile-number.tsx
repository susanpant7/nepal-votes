import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";
import { useState } from "react";
import * as React from "react";
import { Spinner } from "@/components/ui/spinner.tsx";
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mobile" className={loading ? "opacity-70" : ""}>
            Mobile Number
          </Label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              id="mobile"
              type="tel"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="pl-10 h-12"
              disabled={loading}
              required
            />
          </div>
        </div>

        <Button type="submit" className="h-12 w-full" disabled={loading}>
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner className="size-5 animate-spin" />
              <span>Sending OTP...</span>
            </div>
          ) : (
            "Send OTP"
          )}
        </Button>
      </div>
    </form>
  );
};
