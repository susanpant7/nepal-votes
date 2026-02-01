import React from "react";

export interface ScrollableTBodyProps {
  maxHeight?: string;
  children: React.ReactNode;
}
export const ScrollableTableBody = (props: ScrollableTBodyProps) => {
  return (
    <div
      className="relative border rounded-md bg-background overflow-y-auto [&_div]:overflow-visible
                custom-scrollbar"
      style={{ maxHeight: props.maxHeight || "400px" }}
    >
      {props.children}
    </div>
  );
};
