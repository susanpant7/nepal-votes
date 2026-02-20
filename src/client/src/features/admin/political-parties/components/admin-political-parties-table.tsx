import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Plus, Trash2, User } from "lucide-react";
import type { PoliticalPartyInfo } from "@/features/admin/political-parties/types/admin.political-parties.types.ts";
import { ScrollableTableBody } from "@/components/table/scrollable-table-body.tsx";

export interface PoliticalPartiesTableProps {
  parties: PoliticalPartyInfo[];
  onEdit: (politicalPartyId: number) => void;
  onDelete: (politicalPartyId: number) => void;
  onAdd: () => void;
}

export const AdminPoliticalPartiesTable = (
  props: PoliticalPartiesTableProps,
) => {
  return (
    <div className="w-full">
      <ScrollableTableBody maxHeight={"calc(100vh - 250px)"}>
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
          <TableBody>
            {props.parties.length > 0 ? (
              props.parties.map((party) => (
                <TableRow
                  key={party.politicalPartyId}
                  className="group hover:bg-muted/40 transition-colors border-b border-border/40"
                >
                  {/* Increased vertical padding (py-5) for "breathable" rows */}
                  <TableCell className="py-5">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border border-border/50 shadow-sm transition-transform group-hover:scale-105">
                        <AvatarImage
                          src={`data:image/png;base64,${party.partySymbolContent}`}
                          alt={party.politicalPartyName}
                          className="bg-white object-contain p-1.5"
                        />
                        <AvatarFallback className="text-xs font-bold">
                          {party.politicalPartyName
                            .substring(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </TableCell>

                  <TableCell className="py-5">
                    <span className="text-base font-semibold text-foreground tracking-tight">
                      {party.politicalPartyName}
                    </span>
                  </TableCell>

                  <TableCell className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {party.partyLeaderName}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right py-5">
                    <div className="flex justify-end gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => props.onEdit(party.politicalPartyId)}
                        className="h-9 px-3 border-border/50 hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => props.onDelete(party.politicalPartyId)}
                        className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-48 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-4 bg-muted rounded-full">
                      <Plus className="h-6 w-6 opacity-20" />
                    </div>
                    <p>No parties found in the system.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollableTableBody>
    </div>
  );
};
