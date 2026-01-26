import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ScrollableTableBody } from "@/components/table/scrollable-table-body.tsx";
import type { ConstituencyDropdown } from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";
import { ConstituencyDropdownSelect } from "@/features/admin/electoral-constituencies/components/constituency-dropdown-select.tsx";

export interface CandidatesTableProps {}

export const CandidatesTable = () => {
  const onConstituencySelect = (constituency: ConstituencyDropdown) => {
    alert("selected constituency " + constituency.constituencyName);
  };
  return (
    <>
      <div className="w-64">
        <ConstituencyDropdownSelect onChange={onConstituencySelect} />
      </div>
      <ScrollableTableBody maxHeight={"600px"}>
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted/50 backdrop-blur-sm shadow-sm">
            <TableRow className="hover:bg-transparent border-b-2 border-border">
              {/* Added h-14 for height and items-center/align-middle for centering */}
              <TableHead className="w-25 h-14 align-middle font-bold text-foreground">
                Symbol
              </TableHead>
              <TableHead className="h-14 align-middle font-bold text-foreground">
                Party Name
              </TableHead>
              <TableHead className="h-14 align-middle font-bold text-foreground">
                Party Leader
              </TableHead>
              <TableHead className="text-right h-14 align-middle font-bold text-foreground pr-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{/* Your Rows */}</TableBody>
        </Table>
      </ScrollableTableBody>
    </>
  );
};
