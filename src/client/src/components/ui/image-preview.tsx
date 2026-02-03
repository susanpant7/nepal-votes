import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  // Accepts a File object or a Base64/URL string
  file: File | string;
  label: string;
  className?: string;
  // Optional metadata for when 'file' is a string
  fileName?: string;
  fileSize?: number; // in bytes
}

export const ImagePreview = ({
  file,
  label,
  className,
  fileName,
}: ImagePreviewProps) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (typeof file === "string") {
      // If it's a string (Base64), use it directly
      setUrl(file);
    } else if (file instanceof File) {
      // If it's a File, create a blob URL
      const objectUrl = URL.createObjectURL(file);
      setUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const handleDoubleClick = () => {
    if (!url) return;

    // If it's already an Object URL (from a File), just open it
    if (file instanceof File) {
      window.open(url, "_blank");
      return;
    }

    // If it's a Base64 string, convert it to a Blob to avoid document.write
    try {
      const parts = url.split(",");
      const mime = parts[0].match(/:(.*?);/)?.[1];
      const bstr = atob(parts[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      const blob = new Blob([u8arr], { type: mime });
      const blobUrl = URL.createObjectURL(blob);

      const newWindow = window.open(blobUrl, "_blank");

      // Clean up the temporary URL after the window opens
      if (newWindow) {
        newWindow.onload = () => URL.revokeObjectURL(blobUrl);
      }
    } catch (e) {
      console.error("Failed to open image preview", e);
      // Fallback: try opening the raw data URL
      window.open(url, "_blank");
    }
  };

  if (!url) {
    return (
      <div
        className={cn(
          "h-40 w-full animate-pulse bg-muted rounded-md",
          className,
        )}
      />
    );
  }

  // Determine metadata display
  const displayName =
    file instanceof File ? file.name : fileName || "Stored Document";

  return (
    <div className={cn("group relative space-y-2", className)}>
      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
        {label}
      </p>

      <div
        className="relative cursor-pointer overflow-hidden rounded-md border bg-muted shadow-sm transition-all hover:border-primary/50"
        onDoubleClick={handleDoubleClick}
      >
        <img
          src={url}
          alt={label}
          className="h-auto w-full block transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
          <span className="rounded-full bg-black/70 px-3 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Double-click to expand
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-muted-foreground italic">
        <p className="truncate max-w-37.5">{displayName}</p>
      </div>
    </div>
  );
};
