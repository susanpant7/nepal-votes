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
import type { UserRegistrationReviewDetails } from "@/features/admin/user-registrations/types/admin.user-registrations.types.ts";
import { ImagePreview } from "@/components/ui/image-preview.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { cn } from "@/lib/utils.ts";
import { Textarea } from "@/components/ui/textarea.tsx";

export interface Props {
  userReviewData: UserRegistrationReviewDetails;
}

export const UserRegistrationReview = ({ userReviewData }: Props) => {
  const [comment, setComment] = useState(userReviewData.reviewComment || "");

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
            onClick={() => console.log("Rejected")}
          >
            <XCircle className="mr-2 h-4 w-4" /> Reject Application
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => console.log("Approved")}
          >
            <CheckCircle2 className="mr-2 h-4 w-4" /> Approve Registration
          </Button>
        </div>
      </div>

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
              <MapPin className="h-4 w-4" /> Voting Location
            </h2>
            <div className="p-4 rounded-xl border bg-slate-50/50 text-sm leading-relaxed shadow-sm">
              {userReviewData.votingPlaceFullAddress}
            </div>
          </section>

          {/* Documents Section - Grid layout to fill width */}
          <section className="space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
              <FileText className="h-4 w-4" /> Verification Documents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userReviewData.reviewDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="bg-white p-2 rounded-xl border shadow-sm transition-hover hover:shadow-md"
                >
                  <ImagePreview
                    file={doc.documentContent}
                    contentType={doc.documentContentType}
                    fileName={doc.documentName}
                  />
                </div>
              ))}
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
