import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  level: "province" | "district" | "municipality";
  defaultOpen?: boolean;
}

export const CollapsibleSection = ({
  title,
  children,
  level,
  defaultOpen = false,
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const levelStyles = {
    province: "text-lg font-bold text-gray-900 dark:text-gray-100",
    district: "text-md font-semibold text-gray-800 dark:text-gray-200",
    municipality: "text-sm font-medium text-gray-700 dark:text-gray-300",
  };

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded-md transition-colors w-full text-left"
      >
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        <span className={levelStyles[level]}>{title}</span>
      </button>

      {isOpen && (
        <div className="pl-6 border-l border-gray-300 dark:border-gray-600 ml-2 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};
