import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type UserRegistrationForm } from "@/features/users/user-registration/types/users.user-registration.types";
import { ImagePreview } from "@/components/ui/image-preview.tsx";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { ShieldCheck } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Alert, AlertDescription } from "@/components/ui/alert.tsx";

interface ReviewProps {
  data: UserRegistrationForm;
  onEdit: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export const RegistrationReview = ({
  data,
  onEdit,
  onConfirm,
  isSubmitting,
}: ReviewProps) => {
  const [confirmed, setConfirmed] = useState<boolean>(false);

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-7xl">
      <div className="space-y-10">
        {/* Page Header */}

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b pb-8">
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-primary">
                Review Your Registration
              </h2>
              <p className="text-muted-foreground">
                Please perform a final check of your information. This data will
                be used for official records and voter identification.
              </p>
            </div>

            {/* Declaration Section */}
            <Alert className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/10">
              <AlertDescription className="flex items-center gap-3">
                <Checkbox
                  id="terms"
                  checked={confirmed}
                  onCheckedChange={(checked: boolean) => setConfirmed(checked)}
                  className="h-5 w-5 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium leading-tight text-amber-900 dark:text-amber-200 cursor-pointer select-none"
                >
                  I hereby confirm that the{" "}
                  <span className="font-bold">mobile number</span> and the
                  <span className="font-bold"> national ID document</span>{" "}
                  belong to the same person.
                </Label>
              </AlertDescription>
            </Alert>
          </div>

          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 h-fit">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Secure Verification
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Personal & Voting Location */}
          <div className="lg:col-span-4 space-y-6">
            {/* Personal Info Card */}
            <section className="bg-card rounded-xl border p-6 shadow-sm space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3">
                <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>

              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
                Identity Profile
              </h3>

              <div className="space-y-4 pt-2">
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">
                    Full Name
                  </p>
                  <p className="font-semibold text-lg leading-tight">
                    {`${data.firstName} ${data.middleName || ""} ${data.lastName}`}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">
                      Birth Date
                    </p>
                    <p className="font-semibold">{data.dob}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">
                      Contact
                    </p>
                    <p className="font-semibold">{data.mobileNumber}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Voting Center Card */}
            <section className="bg-primary/5 rounded-xl border border-primary/10 p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/70">
                Selected Voting Center
              </h3>
              <div className="space-y-1">
                <p className="text-base font-bold text-primary">
                  {data.votingPlace?.votingPlaceAddress}
                </p>
                <p className="text-xs text-muted-foreground italic">
                  Code: #{data.votingPlace?.votingPlaceId}
                </p>
              </div>
            </section>

            <div className="pt-4">
              <Button
                variant="outline"
                onClick={onEdit}
                disabled={isSubmitting}
                className="w-full h-12 border-dashed border-2 hover:bg-muted font-bold uppercase tracking-widest text-xs transition-all"
              >
                ← Back to Edit Details
              </Button>
            </div>
          </div>

          {/* Right Column: Documents Grid */}
          <div className="lg:col-span-8 space-y-6">
            <section className="bg-card rounded-xl border p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">National Id</h3>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="px-4 py-1.5 font-bold tracking-widest text-[11px]"
                >
                  National ID: {data.nIdNumber}
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <ImagePreview
                  file={data.nIdDocument}
                  fileName="National ID Card"
                />
              </div>
            </section>

            {/* Final Action Area */}
            <div className="flex items-center justify-end gap-6 pt-4">
              <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50/50 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-600 mt-0.5 shrink-0"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
                <p className="text-xs font-medium leading-relaxed text-amber-900">
                  <span className="font-bold uppercase tracking-tight">
                    Certification:
                  </span>{" "}
                  By clicking register, you certify that all information
                  provided is accurate and truthful. Providing false information
                  may lead to disqualification.
                </p>
              </div>
              <Button
                onClick={onConfirm}
                className="w-64 h-14 text-lg font-bold shadow-2xl shadow-primary/30 active:scale-[0.97] transition-all"
                disabled={isSubmitting || !confirmed}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                    Processing...
                  </div>
                ) : (
                  "Confirm & Register"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
