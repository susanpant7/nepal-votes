import {
  FileText,
  MapPin,
  Phone,
  Calendar,
  User,
  XCircle,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import type {
  UserRegistrationReviewDetails,
  UserRegistrationUpdate,
} from "@/features/admin/user-registrations/types/admin.user-registrations.types.ts";
import { ImagePreview } from "@/components/ui/image-preview.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { cn } from "@/lib/utils.ts";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useAdminUserRegistrationMutation } from "@/features/admin/user-registrations/api/admin.user-registrations.query.ts";
import { useConfirm } from "@/components/confirm/confirm-dialogbox.provider.tsx";
import { useOverlayStore } from "@/stores/useOverlayStore.ts";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/lib/app.routes.urls.ts";
import { showNotification } from "@/components/toaster/toaster.utils.ts";
import { Alert, AlertDescription } from "@/components/ui/alert.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";

export interface Props {
  userRegistrationId: number;
  userReviewData: UserRegistrationReviewDetails;
}

export const UserRegistrationReview = ({
  userRegistrationId,
  userReviewData,
}: Props) => {
  const { approveRegisteredUser, rejectRegisteredUser } =
    useAdminUserRegistrationMutation();

  const [comment, setComment] = useState(userReviewData.reviewComment || "");

  const [confirmMobileNumber, setConfirmMobileNumber] = useState(false);
  const [confirmNationalIdNumber, setConfirmNationalIdNumber] = useState(false);
  const [confirmVoterIdNumber, setConfirmVoterIdNumber] = useState(false);

  const confirm = useConfirm();
  const { showOverlay, hideOverlay } = useOverlayStore();
  const navigate = useNavigate();

  const onApproveClick = async () => {
    await updateUserRegistration(true);
  };

  const onRejectClick = async () => {
    if ((comment?.length ?? 0) <= 10) {
      showNotification.error("Please add a proper comment for rejection");
      return;
    }
    await updateUserRegistration(false);
  };

  const updateUserRegistration = async (isApproved: boolean) => {
    try {
      const isConfirm = await confirm({
        title: `Are you sure you want to ${isApproved ? "Approve" : "Reject"} this confirmation?`,
        description: (
          <>This user will {isApproved ? "" : "NOT"} be eligible to vote</>
        ),
      });
      if (isConfirm) {
        showOverlay();
        const request: UserRegistrationUpdate = {
          userRegistrationId: userRegistrationId,
          reviewComment: comment.trim(),
        };
        isApproved
          ? await approveRegisteredUser.mutateAsync(request)
          : await rejectRegisteredUser.mutateAsync(request);
        await navigate({
          to: ROUTES.ADMIN_USER_REGISTRATIONS,
        });
      }
    } catch (e) {
    } finally {
      hideOverlay();
    }
  };

  const disableApproveButton =
    !confirmMobileNumber || !confirmNationalIdNumber || !confirmVoterIdNumber;

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Registration Review
          </h1>
          <p className="text-muted-foreground">
            Verify citizen details and uploaded identification documents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="text-destructive border-destructive hover:bg-destructive/10"
            onClick={onRejectClick}
          >
            <XCircle className="mr-2 h-4 w-4" /> Reject Application
          </Button>
          <Button
            disabled={disableApproveButton}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={onApproveClick}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" /> Approve Registration
          </Button>
        </div>
      </div>

      <Alert className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/10 mb-2">
        <AlertDescription className="flex items-center gap-3">
          <Checkbox
            checked={confirmMobileNumber}
            onCheckedChange={(checked: boolean) =>
              setConfirmMobileNumber(checked)
            }
            className="h-5 w-5 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
          />
          <Label className="text-sm font-medium leading-tight text-amber-900 dark:text-amber-200 cursor-pointer select-text">
            Mobile number{" "}
            <span className="font-bold select-all">
              {userReviewData.mobileNumber}
            </span>{" "}
            is registered for the person
            <span className="font-bold select-all">
              {" "}
              {userReviewData.firstName +
                " " +
                (userReviewData.middleName ?? "") +
                " " +
                userReviewData.lastName}
            </span>
          </Label>
        </AlertDescription>
      </Alert>

      <Alert className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/10 mb-2">
        <AlertDescription className="flex items-center gap-3">
          <Checkbox
            checked={confirmNationalIdNumber}
            onCheckedChange={(checked: boolean) =>
              setConfirmNationalIdNumber(checked)
            }
            className="h-5 w-5 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
          />
          <Label className="text-sm font-medium leading-tight text-amber-900 dark:text-amber-200 cursor-pointer select-text">
            National ID number{" "}
            <span className="font-bold select-all">
              {userReviewData.nationalIdNumber}
            </span>{" "}
            is registered for the person
            <span className="font-bold select-all">
              {" "}
              {userReviewData.firstName +
                " " +
                (userReviewData.middleName ?? "") +
                " " +
                userReviewData.lastName}
            </span>
          </Label>
        </AlertDescription>
      </Alert>

      <Alert className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/10">
        <AlertDescription className="flex items-center gap-3">
          <Checkbox
            checked={confirmVoterIdNumber}
            onCheckedChange={(checked: boolean) =>
              setConfirmVoterIdNumber(checked)
            }
            className="h-5 w-5 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
          />
          <Label className="text-sm font-medium leading-tight text-amber-900 dark:text-amber-200 cursor-pointer select-text">
            Voter ID number{" "}
            <span className="font-bold select-all">
              {userReviewData.voterIdNumber}
            </span>{" "}
            is registered for the person
            <span className="font-bold select-all">
              {" "}
              {userReviewData.firstName +
                " " +
                (userReviewData.middleName ?? "") +
                " " +
                userReviewData.lastName}
            </span>
          </Label>
        </AlertDescription>
      </Alert>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Information */}
        <div className="lg:col-span-2 space-y-10">
          {/* Personal Info Grid */}
          <section className="space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
              <User className="h-4 w-4" /> Personal Profile
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <InfoBlock
                label="Full Name"
                value={`${userReviewData.firstName} ${userReviewData.middleName ?? ""} ${userReviewData.lastName}`}
                uppercase
              />
              <InfoBlock
                label="Date of Birth"
                value={
                  userReviewData.dob === "0001-01-01"
                    ? "Not Provided"
                    : userReviewData.dob
                }
                icon={<Calendar className="h-3.5 w-3.5" />}
              />
              <InfoBlock
                label="Mobile Number"
                value={userReviewData.mobileNumber}
                icon={<Phone className="h-3.5 w-3.5" />}
              />
              <InfoBlock
                label="Voter Status"
                value={<Badge variant="outline">Pending Review</Badge>}
              />
            </div>
          </section>

          {/* Address Section */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Voter Inforation
            </h2>
            <InfoBlock
              label="Voter ID Number"
              value={userReviewData.voterIdNumber}
              uppercase
            />
            <InfoBlock
              label="Voting Address"
              value={userReviewData.votingPlaceFullAddress}
              uppercase
            />
          </section>

          {/* Documents Section - Grid layout to fill width */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
                <FileText className="h-4 w-4" /> National Id Document
              </h2>

              <Badge
                variant="secondary"
                className="px-4 py-1.5 font-bold tracking-widest text-[11px]"
              >
                {userReviewData.nationalIdNumber}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImagePreview
                file={userReviewData.nationalIdDocumentContent}
                contentType={userReviewData.nationalIdDocumentContentType}
                fileName={userReviewData.nationalIdDocumentName}
              />
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Sidebar for Reviewer */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-4 p-6 rounded-2xl border bg-card shadow-sm">
            <h2 className="font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Reviewer Decision
            </h2>
            <p className="text-xs text-muted-foreground">
              Provide a reason if you are rejecting or notes for the citizen.
            </p>
            <Textarea
              placeholder="Write your review comments here..."
              className="min-h-50 bg-background"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="pt-2 space-y-2">
              <p className="text-[10px] text-muted-foreground italic">
                * Approved applications will be finalized immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for clean layout
const InfoBlock = ({ label, value, icon, uppercase }: any) => (
  <div className="space-y-1.5">
    <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
      {icon} {label}
    </p>
    <div className={cn("text-base font-medium", uppercase && "uppercase")}>
      {value}
    </div>
  </div>
);
