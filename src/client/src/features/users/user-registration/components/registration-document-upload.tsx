import { Label } from "@/components/ui/label";
import { ImageField } from "@/components/ui/image-field.tsx";
import { Input } from "@/components/ui/input.tsx";
import type { ChangeEvent } from "react";

interface Props {
  nationalIdNumber: string;
  onNationalIdNumberChange: (e: ChangeEvent<HTMLInputElement>) => void;
  nationalIdDocument: File | null;
  onNationalIdDocumentChange: (file: File | null) => void;
  voterIdNumber: string;
  onVoterIdNumberChange: (e: ChangeEvent<HTMLInputElement>) => void;
  voterIdDocument: File | null;
  onVoterIdDocumentChange: (file: File | null) => void;
  passportDocument: File | null;
  onPassportDocumentChange: (file: File | null) => void;
  errors?: Record<string, string>;
}

export const RegistrationDocumentUpload = ({
  nationalIdNumber,
  onNationalIdNumberChange,
  nationalIdDocument,
  onNationalIdDocumentChange,
  voterIdNumber,
  onVoterIdNumberChange,
  voterIdDocument,
  onVoterIdDocumentChange,
  passportDocument,
  onPassportDocumentChange,
  errors,
}: Props) => {
  return (
    <div className="space-y-8">
      {/* Section 1: National ID */}
      <div className="space-y-6 p-6 border rounded-xl bg-background shadow-sm">
        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary" />
          National Identity
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div className="space-y-2">
            <Label htmlFor="nIdNumber" className={errors?.nIdNumber ? "text-destructive transition-colors" : ""}>National ID Number <span className="text-destructive">*</span></Label>
            <Input
              id="nIdNumber"
              name="nIdNumber"
              value={nationalIdNumber || ""}
              placeholder="Enter your NID"
              onChange={onNationalIdNumberChange}
              className={errors?.nIdNumber ? "border-destructive ring-destructive/20" : ""}
            />
            {errors?.nIdNumber && <p className="text-[10px] font-bold text-destructive">{errors.nIdNumber}</p>}
          </div>
          <ImageField
            label="NID Document Copy *"
            value={nationalIdDocument}
            onChange={onNationalIdDocumentChange}
            maxSizeMB={3}
            errorMessage={errors?.nIdDocument}
          />
        </div>
      </div>

      {/* Section 2: Voter ID */}
      <div className="space-y-6 p-6 border rounded-xl bg-background shadow-sm">
        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary" />
          Voter Identity
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div className="space-y-2">
            <Label htmlFor="voterIdNumber" className={errors?.voterIdNumber ? "text-destructive transition-colors" : ""}>Voter ID Number <span className="text-destructive">*</span></Label>
            <Input
              id="voterIdNumber"
              name="voterIdNumber"
              value={voterIdNumber || ""}
              placeholder="Enter your Voter ID"
              onChange={onVoterIdNumberChange}
              className={errors?.voterIdNumber ? "border-destructive ring-destructive/20" : ""}
            />
            {errors?.voterIdNumber && <p className="text-[10px] font-bold text-destructive">{errors.voterIdNumber}</p>}
          </div>
          <ImageField
            label="Voter ID Document Copy *"
            value={voterIdDocument}
            onChange={onVoterIdDocumentChange}
            maxSizeMB={3}
            errorMessage={errors?.voterIdDocument}
          />
        </div>
      </div>

      {/* Section 3: Passport (Optional) */}
      <div className="space-y-6 p-6 border rounded-xl bg-background shadow-sm">
        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-muted-foreground" />
          Passport (Optional)
        </h4>
        <ImageField
          label="Passport Document Copy"
          value={passportDocument}
          onChange={onPassportDocumentChange}
          maxSizeMB={3}
        />
      </div>
    </div>
  );
};
