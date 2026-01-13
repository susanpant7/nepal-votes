import { toast } from "sonner";

export const notify = {
    // Success: Solid Green bg, White text
    success: (message: string, duration = 3000) => {
        toast.success(message, {
            duration: duration,
            className: "!bg-green-600 !text-white !border-green-700 dark:!bg-green-700",
        });
    },

    // Error: Solid Red bg, White text, Infinite
    error: (message: string) => {
        toast.error(message, {
            duration: Infinity,
            className: "!bg-red-600 !text-white !border-red-700 dark:!bg-red-700",
        });
    },

    // Warning: Solid Yellow bg, Black/Dark text (for readability)
    warning: (message: string, duration = 5000) => {
        toast.warning(message, {
            duration: duration,
            className: "!bg-yellow-500 !text-black !border-yellow-600 dark:!bg-yellow-600 dark:!text-white",
        });
    },
};