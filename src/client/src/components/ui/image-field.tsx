import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export interface ImageFieldProps {
    label: string;
    value: File | string | null;             // backend Base64 or File
    onChange: (file: File | null) => void;   // called on file select or clear
    maxSizeMB?: number;                       // default 3 MB
    className?: string;
    previewClassName?: string;
    errorClassName?: string;
}

export const ImageField: React.FC<ImageFieldProps> = ({
                                                          label,
                                                          value,
                                                          onChange,
                                                          maxSizeMB = 3,
                                                          className,
                                                          previewClassName,
                                                          errorClassName,
                                                      }) => {
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");

    const inputRef = useRef<HTMLInputElement | null>(null);

    // generate preview and file name
    useEffect(() => {
        if (!value) {
            setPreviewUrl("");
            setFileName("");
            return;
        }

        if (typeof value === "string") {
            setPreviewUrl(value.startsWith("data:") ? value : `data:image/*;base64,${value}`);
            setFileName("Existing Image"); // placeholder name for backend image
        } else {
            const objectUrl = URL.createObjectURL(value);
            setPreviewUrl(objectUrl);
            setFileName(value.name);

            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (!file) return;

        // File size validation
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > maxSizeMB) {
            setError(`File size exceeds ${maxSizeMB} MB.`);
            if (inputRef.current) inputRef.current.value = "";
            return;
        }

        setError("");
        onChange(file);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleClear = () => {
        setError("");
        onChange(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className={`flex gap-4 ${className}`}>
            {/* Left buttons */}
            <div className="flex flex-col gap-2">
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => inputRef.current?.click()}
                    className="dark:border-gray-700 dark:text-gray-200"
                >
                    {value ? "Change Image" : "Select Image"}
                </Button>
                {value && (
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                )}
            </div>

            {/* Right: preview + filename + error/warning */}
            <div className="flex flex-col gap-1 justify-center">
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt={label}
                        className={`rounded border object-contain ${previewClassName ?? "h-24 w-24"}`}
                    />
                )}
                {fileName && (
                    <p className="text-sm text-muted-foreground break-all">{fileName}</p>
                )}
                {!error && !value && (
                    <p className="text-sm text-muted-foreground">
                        Select image with size less than {maxSizeMB} MB.
                    </p>
                )}
                {error && (
                    <p className={`text-sm text-destructive ${errorClassName ?? ""}`}>{error}</p>
                )}
            </div>
        </div>
    );
};
