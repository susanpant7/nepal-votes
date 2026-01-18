import React, { createContext, useContext, useState, useRef } from "react";
import {ConfirmDialogbox} from "@/components/confirm/confirm-dialogbox.tsx";

interface ConfirmOptions {
    title: string;
    description: string;
}

// The type for our context function
type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | undefined>(undefined);

export const ConfirmProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions>({ title: "", description: "" });

    // Use a ref to store the resolve function of the promise
    const resolver = useRef<(value: boolean) => void>(null);

    const confirm: ConfirmFn = (data) => {
        setOptions(data);
        setOpen(true);
        return new Promise((resolve) => {
            resolver.current = resolve;
        });
    };

    const handleConfirm = () => {
        setOpen(false);
        resolver.current?.(true);
    };

    const handleCancel = () => {
        setOpen(false);
        resolver.current?.(false);
    };

    return (
        <ConfirmContext.Provider 
            value={confirm}>
            {children}
            <ConfirmDialogbox
                open={open}
                title={options.title}
                description={options.description}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </ConfirmContext.Provider>
);
};

export const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error("useConfirm must be used within a ConfirmProvider");
    }
    return context;
};