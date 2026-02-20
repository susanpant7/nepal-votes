import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AdminPageProps {
    children: ReactNode;
    className?: string;
}

export const AdminPage = ({ children, className }: AdminPageProps) => {
    return (
        <div className={cn("h-full flex flex-col overflow-hidden bg-background", className)}>
            {children}
        </div>
    );
};

interface AdminPageHeaderProps {
    title: string;
    description?: string;
    icon?: ReactNode;
    actions?: ReactNode;
    className?: string;
}

export const AdminPageHeader = ({ title, description, icon, actions, className }: AdminPageHeaderProps) => {
    return (
        <div className={cn("flex-none p-6 pb-2 space-y-4", className)}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                        {icon && <span className="text-primary">{icon}</span>}
                        {title}
                    </h1>
                    {description && (
                        <p className="text-muted-foreground mt-1">
                            {description}
                        </p>
                    )}
                </div>
                {actions && (
                    <div className="flex items-center gap-2">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
};

interface AdminPageContentProps {
    children: ReactNode;
    className?: string;
}

export const AdminPageContent = ({ children, className }: AdminPageContentProps) => {
    return (
        <div className={cn("flex-1 overflow-hidden flex flex-col p-6 pt-0", className)}>
            <div className="flex-1 overflow-y-auto min-h-0">
                {children}
            </div>
        </div>
    );
};
