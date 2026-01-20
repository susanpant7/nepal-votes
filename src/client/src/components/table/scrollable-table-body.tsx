import React from "react";

export interface ScrollableTBodyProps {
  maxHeight?: string;
  children: React.ReactNode;
}
export const ScrollableTableBody = (props: ScrollableTBodyProps) => {
  return (
    <div
      className="relative border rounded-md bg-background overflow-y-auto [&_div]:overflow-visible
                /* Scrollbar Styling - Uses shadcn variables */
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20
                [&::-webkit-scrollbar-thumb]:rounded-full
                hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40"
      style={{ maxHeight: props.maxHeight || "400px" }}
    >
      {props.children}
    </div>
  );
};
