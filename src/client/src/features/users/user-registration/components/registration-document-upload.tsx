import { Label } from "@/components/ui/label";
import { ImageField } from "@/components/ui/image-field.tsx";
import { Input } from "@/components/ui/input.tsx";
import type { ChangeEvent } from "react";

interface Props {
  nationalIdNumber: string;
  onNationalIdNumberChange: (e: ChangeEvent<HTMLInputElement>) => void;
  nationalIdDocument: File | null;
  onNationalIdDocumentChange: (file: File | null) => void;
  nationalIdNumberError?: string;
  nationalIdDocumentError?: string;
}

export const RegistrationDocumentUpload = ({
  nationalIdNumber,
  onNationalIdNumberChange,
  nationalIdDocument,
  onNationalIdDocumentChange,
  nationalIdNumberError,
  nationalIdDocumentError,
}: Props) => {
  return (
    <div
      className={`space-y-6 p-6 border rounded-xl transition-all ${
        nationalIdNumberError || nationalIdDocumentError
          ? "border-destructive ring-1 ring-destructive/10"
          : "border-border shadow-sm"
      }`}
    >
      <div className="flex flex-col space-y-6">
        {/* Field 1: ID Number */}
        <div className="space-y-2">
          <Label
            htmlFor="nIdNumber"
            className={nationalIdNumberError ? "text-destructive" : ""}
          >
            National ID Number
          </Label>
          <Input
            id="nIdNumber"
            name="nIdNumber"
            value={nationalIdNumber}
            placeholder="Enter your NID"
            className={`bg-white ${nationalIdNumberError ? "border-destructive" : ""}`}
            onChange={onNationalIdNumberChange}
          />
          {nationalIdNumberError && (
            <p className="text-[11px] font-semibold text-destructive animate-in fade-in slide-in-from-top-1">
              {nationalIdNumberError}
            </p>
          )}
        </div>

        {/* Field 2: Document Image */}
        <div
          className={`space-y-2 ${nationalIdDocumentError ? "border-destructive" : ""} `}
        >
          <ImageField
            label={"National ID Document Copy"}
            value={nationalIdDocument}
            onChange={(file) => onNationalIdDocumentChange(file)}
            maxSizeMB={3}
          />
          {nationalIdDocumentError && (
            <p className="text-[11px] font-semibold text-destructive animate-in fade-in slide-in-from-top-1">
              {nationalIdDocumentError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
