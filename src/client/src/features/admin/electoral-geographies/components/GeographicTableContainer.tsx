import React from "react";
import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";

export interface TableHeaderProps {
  module: string;
  hierarchy: string;
  onAdd: () => void;
  themeClassName?: string;
  children: React.ReactNode;
}

const GeographicTableContainer = (props: TableHeaderProps) => {
  return (
    <div
      className={`pl-2 py-6 pr-6 rounded-lg border-2 border-l-8 ${props.themeClassName} dark:shadow-none overflow-hidden`}
    >
      {/* 1. Added "max-w-full" 
         2. Ensured "gap-4" to keep distance from the button 
      */}
      <div className="flex items-center justify-between gap-4 mb-6 max-w-full">
        {/* Text Section: Added overflow-hidden to help the truncate trigger */}
        <div className="flex flex-col gap-1 min-w-0 flex-1 overflow-hidden">
          <h4 className="text-xl font-bold tracking-tight text-foreground truncate">
            {props.module} Management
          </h4>
          <p
            className="text-sm font-medium tracking-wide text-muted-foreground/70 truncate"
            title={props.hierarchy}
          >
            {props.hierarchy}
          </p>
        </div>

        {/* Button: Added shrink-0 so the button never gets squished */}
        <Button
          onClick={props.onAdd}
          className="
            shrink-0 relative h-10 px-5 gap-2 
            bg-primary text-primary-foreground 
            shadow-[0_4px_14px_0_rgba(var(--primary),0.39)] 
            hover:shadow-[0_6px_20px_rgba(var(--primary),0.23)] 
            hover:-translate-y-px 
            active:translate-y-px
            transition-all duration-200 
            font-semibold rounded-full
          "
        >
          <Plus className="h-4 w-4 stroke-[3px]" />
          <span className="hidden sm:inline">Add {props.module}</span>
        </Button>
      </div>

      <div className="bg-background rounded-lg border shadow-sm overflow-hidden">
        {props.children}
      </div>
    </div>
  );
};
export default GeographicTableContainer;
