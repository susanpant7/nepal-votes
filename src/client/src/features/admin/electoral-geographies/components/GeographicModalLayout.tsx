import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GeographicModalLayoutProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    title: string;
    isEdit: boolean;
    saveDisabled: boolean;
    children: React.ReactNode;
}

export function GeographicModalLayout({
                                          isOpen,
                                          onClose,
                                          onSave,
                                          title,
                                          isEdit,
                                          saveDisabled,
                                          children,
                                      }: GeographicModalLayoutProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="sm:max-w-106.25 border-2 border-border shadow-2xl dark:shadow-primary/10"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold tracking-tight">
                        {isEdit ? `Edit ${title}` : `Add New ${title}`}
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    {children}
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={onSave}
                        className="min-w-20 bg-primary hover:opacity-90"
                        disabled={saveDisabled}
                    >
                        { isEdit ? "Update" : "Save" }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}