import { Fragment, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react";
import type { ConstituencyListItem } from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/lib/app.routes.urls.ts";

type Props = {
  constituencies: ConstituencyListItem[];
};

export const ConstituenciesTable = ({ constituencies }: Props) => {
  const navigate = useNavigate();

  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const onEditConstituency = async (constituencyId: number) => {
    await navigate({
      to: ROUTES.ADMIN_ELECTORAL_CONSTITUENCIES_EDIT,
      params: { constituencyId: constituencyId },
    });
  };

  const onDeleteConstituency = async (constituencyId: number) => {
    alert(
      "are you sure you want to delete this constituency? ID: " +
        constituencyId,
    );
  };

  return (
    <div className="rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Constituency</TableHead>
            <TableHead className="w-40 text-center">Total Wards</TableHead>
            <TableHead className="w-28 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {constituencies.map((c) => {
            const isExpanded = expandedIds.has(c.constituencyId);

            return (
              <Fragment key={c.constituencyId}>
                {/* Main row */}
                <TableRow className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleExpand(c.constituencyId)}
                        className="rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>

                      <span className="font-medium">{c.constituencyName}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-center font-medium">
                    {c.totalWards}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onEditConstituency(c.constituencyId)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => onDeleteConstituency(c.constituencyId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Expanded content */}
                {isExpanded && (
                  <TableRow className="bg-muted/30">
                    <TableCell colSpan={3} className="py-3">
                      {/* 
                        Padding-left aligns content under constituency name
                        (icon + gap + text ≈ 2.5rem)
                      */}
                      <div className="pl-10 space-y-2 text-sm">
                        {c.municipalityNameAndWardNumbers.map((m) => (
                          <div
                            key={m.municipalityName}
                            className="flex items-start gap-2"
                          >
                            <span className="font-medium">
                              {m.municipalityName}
                            </span>
                            <span className="text-muted-foreground">
                              — Wards {m.wardNumbers}
                            </span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            );
          })}
          {constituencies.length == 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-sm text-muted-foreground py-4"
              >
                No constituencies found for the selected province and district.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
