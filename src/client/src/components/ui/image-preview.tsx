import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  file: File;
  label: string;
  className?: string;
}

export const ImagePreview = ({ file, label, className }: ImagePreviewProps) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    // Generate the blob URL for the provided file
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);

    // Cleanup: Ensure the memory is released when the component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleDoubleClick = () => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  // Render a placeholder skeleton if the URL isn't ready yet
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

  return (
    <div className={cn("group relative space-y-2", className)}>
      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
        {label}
      </p>

      <div
        className="relative cursor-pointer overflow-hidden rounded-md border bg-muted shadow-sm transition-all hover:border-primary/50"
        onDoubleClick={handleDoubleClick}
        title="Double-click to view full image"
      >
        <img
          src={url}
          alt={label}
          className="h-auto w-full block transition-transform duration-300 group-hover:scale-[1.02]"
        />

        {/* Interactive Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
          <span className="rounded-full bg-black/70 px-3 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Double-click to expand
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-muted-foreground italic">
        <p className="truncate max-w-37.5">{file.name}</p>
        <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
      </div>
    </div>
  );
};
