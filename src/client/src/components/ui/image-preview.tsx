import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  file: File | string | null;
  contentType?: string;
  fileName?: string;
  className?: string;
}

export const ImagePreview = ({
  file,
  contentType,
  fileName,
  className,
}: ImagePreviewProps) => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (typeof file === "string") {
      // If it's already a full Data URL or an external link, use it directly
      if (file.startsWith("data:") || file.startsWith("http")) {
        setUrl(file);
      } else {
        // Otherwise, treat it as raw Base64 and wrap it
        // Default to image/png if contentType is missing, but better to pass it!
        const mime = contentType || "image/png";
        setUrl(`data:${mime};base64,${file}`);
      }
    } else if (file != null) {
      // Handle File object from input
      const objectUrl = URL.createObjectURL(file);
      setUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file, contentType]);

  const label =
    (typeof file === "string" ? fileName : file?.name) || "Image Preview";
  const handleDoubleClick = () => {
    if (!url) return;
    const newTab = window.open();
    if (newTab) {
      newTab.document.body.style.margin = "0";
      newTab.document.body.style.display = "flex";
      newTab.document.body.style.justifyContent = "center";
      newTab.document.body.innerHTML = `<img src="${url}" style="max-width:100%; height:auto;" alt="${fileName}">`;
      newTab.document.title = label;
    }
  };

  if (!file) {
    return (
      <div className="flex items-center text-red-800 gap-2 px-4 py-2 border-l-4 border-primary rounded-r-md">
        <p className="text-sm">No Image To Preview.</p>
      </div>
    );
  }
  return (
    <div className={cn("group relative space-y-2", className)}>
      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      <div
        className="relative cursor-pointer overflow-hidden rounded-md border bg-slate-50"
        onDoubleClick={handleDoubleClick}
      >
        {/* Hover Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-[10px] font-medium text-white bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm">
            Double click to open
          </span>
        </div>

        {url ? (
          <img
            src={url}
            alt={label}
            className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="h-32 flex items-center justify-center text-muted-foreground text-xs">
            Loading image...
          </div>
        )}
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground italic">
        <p>{typeof file === "string" ? "Stored Document" : file.name}</p>
      </div>
    </div>
  );
};
