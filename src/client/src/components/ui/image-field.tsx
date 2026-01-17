import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, ClipboardPaste, X } from "lucide-react";

export interface ImageFieldProps {
    label: string;
    value: File | string | null;
    onChange: (file: File | null) => void;
    maxSizeMB?: number;
}

export const ImageField: React.FC<ImageFieldProps> = ({
                                                          label,
                                                          value,
                                                          onChange,
                                                          maxSizeMB = 3,
                                                      }) => {
    const [previewUrl, setPreviewUrl] = useState("");
    const [error, setError] = useState("");

    const inputRef = useRef<HTMLInputElement | null>(null);

    /* -----------------------------
       Generate preview
    ------------------------------*/
    useEffect(() => {
        if (!value) {
            setPreviewUrl("");
            return;
        }

        if (typeof value === "string") {
            setPreviewUrl(
                value.startsWith("data:")
                    ? value
                    : `data:image/*;base64,${value}`
            );
        } else {
            const url = URL.createObjectURL(value);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [value]);

    /* -----------------------------
       Validation helper
    ------------------------------*/
    const validateAndSetFile = (file: File) => {
        if (file.size / (1024 * 1024) > maxSizeMB) {
            setError(`Image must be smaller than ${maxSizeMB} MB`);
            return;
        }
        setError("");
        onChange(file);
    };

    /* -----------------------------
       File select
    ------------------------------*/
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) validateAndSetFile(file);
        if (inputRef.current) inputRef.current.value = "";
    };

    /* -----------------------------
       Paste handler (box)
    ------------------------------*/
    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        const items = e.clipboardData.items;
        for (const item of items) {
            if (item.type.startsWith("image/")) {
                const file = item.getAsFile();
                if (file) validateAndSetFile(file);
                return;
            }
        }
    };

    /* -----------------------------
       Clear image
    ------------------------------*/
    const handleClear = () => {
        setError("");
        onChange(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="space-y-2">
            {/* Image Box */}
            <div
                tabIndex={0}
                onPaste={handlePaste}
                className={`relative flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed p-4 text-center focus:border-primary focus:outline-none ${
                    error ? "border-destructive" : "border-muted"
                }`}
            >
                {/* Preview inside box */}
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt={label}
                        className="max-h-40 max-w-full rounded object-contain"
                    />
                ) : (
                    <>
                        <ClipboardPaste className="h-6 w-6 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                            Paste image here or click below
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Max image size {maxSizeMB} MB
                        </p>
                    </>
                )}

                {/* Action buttons */}
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => inputRef.current?.click()}
                        className="flex items-center gap-2"
                    >
                        <ImageIcon className="h-4 w-4" />
                        { value ? "Change" : "Select" } {label}
                    </Button>

                    {value && (
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleClear}
                        >
                            <X className="h-4 w-4" />
                            Clear
                        </Button>
                    )}
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {/* Error */}
            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
            
        </div>
    );
};
