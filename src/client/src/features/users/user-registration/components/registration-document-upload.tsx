import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DOCUMENT_OPTIONS,
  type DocumentCategory,
  UserDocumentType,
} from "@/features/users/user-registration/types/users.user-registration.types.ts";
import { ImageField } from "@/components/ui/image-field.tsx";

interface Props {
  selectedCategory: DocumentCategory | "";
  onCategoryChange: (value: DocumentCategory) => void;
  documentFiles: Record<number, File | null>;
  onFileChange: (id: number, file: File | null) => void;
  error?: string;
}

export const RegistrationDocumentUpload = ({
  selectedCategory,
  onCategoryChange,
  documentFiles,
  onFileChange,
  error,
}: Props) => {
  return (
    <div
      className={`space-y-6 p-4 border rounded-lg bg-card transition-all ${
        error
          ? "border-destructive ring-1 ring-destructive/20"
          : "border-border"
      }`}
    >
      <div className="space-y-2">
        <Label className={error ? "text-destructive" : ""}>
          Select Document Type
        </Label>
        <Select
          onValueChange={(val) => onCategoryChange(val as DocumentCategory)}
          value={selectedCategory}
        >
          <SelectTrigger className={error ? "border-destructive" : ""}>
            <SelectValue placeholder="Choose a document type" />
          </SelectTrigger>
          <SelectContent>
            {DOCUMENT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p className="text-[10px] font-medium text-destructive">{error}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedCategory &&
          DOCUMENT_OPTIONS.find(
            (o) => o.value === selectedCategory,
          )?.enumIds.map((id) => (
            <ImageField
              key={id}
              label={
                id === UserDocumentType.CitizenshipFront
                  ? "Front Side"
                  : id === UserDocumentType.CitizenshipBack
                    ? "Back Side"
                    : "Document Copy"
              }
              value={documentFiles[id] || null}
              onChange={(file) => onFileChange(id, file)}
              maxSizeMB={3}
            />
          ))}
      </div>
    </div>
  );
};
