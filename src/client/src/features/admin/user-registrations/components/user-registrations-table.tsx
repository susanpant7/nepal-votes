import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { ScrollableTableBody } from "@/components/table/scrollable-table-body.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";

import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";
import type { UserRegistrationListItem, PaginatedResponse } from "@/features/admin/user-registrations/types/admin.user-registrations.types.ts";
import { Button } from "@/components/ui/button.tsx";
import { formatToLocalTime } from "@/lib/date-formatter.ts";
import type { VariantProps } from "class-variance-authority";
import { Badge, type badgeVariants } from "@/components/ui/badge.tsx";
import { ROUTES } from "@/lib/app.routes.urls.ts";

export interface UserRegistrationsTableProps {
  data: PaginatedResponse<UserRegistrationListItem> | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  onPageChange: (page: number) => void;
}
export const UserRegistrationsTable = ({
  data,
  isLoading,
  isError,
  refetch,
  onPageChange,
}: UserRegistrationsTableProps) => {

  type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];

  const getStatusVariant = (status: string): BadgeVariant => {
    switch (status.toLowerCase()) {
      case "pending":
        return "outline";
      case "approved":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const users = data?.items ?? [];

  const navigate = useNavigate();

  const onReviewClick = async (userRegistrationId: number) => {
    await navigate({
      to: ROUTES.ADMIN_USER_REGISTRATIONS_REVIEW,
      params: { id: userRegistrationId },
    });
  };

  return (
    <QueryWrapper isLoading={isLoading} isError={isError} refetch={refetch}>
      <ScrollableTableBody maxHeight={"600px"}>
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted/50 backdrop-blur-sm shadow-sm">
            <TableRow className="hover:bg-transparent border-b-2 border-border">
              <TableHead className="h-14 align-middle font-bold text-foreground">
                Full Name
              </TableHead>
              <TableHead className="h-14 align-middle font-bold text-foreground">
                Contact
              </TableHead>
              <TableHead className="h-14 align-middle font-bold text-foreground">
                National ID
              </TableHead>
              <TableHead className="h-14 align-middle font-bold text-foreground">
                Voter ID
              </TableHead>
              <TableHead className="h-14 align-middle font-bold text-foreground">
                Applied Date
              </TableHead>
              <TableHead className="h-14 align-middle font-bold text-foreground">
                Status
              </TableHead>
              <TableHead className="text-right h-14 align-middle font-bold text-foreground pr-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow
                  key={user.userRegistrationId}
                  className="group hover:bg-muted/40 transition-colors border-b border-border/40"
                >
                  {/* Name */}
                  <TableCell className="py-5">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-semibold text-foreground tracking-tight whitespace-normal max-w-50 leading-tight">
                        {user.fullName}
                      </span>
                    </div>
                  </TableCell>

                  {/* Mobile */}
                  <TableCell className="py-5">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-sm font-medium">
                        {user.mobileNumber}
                      </span>
                    </div>
                  </TableCell>

                  {/* National ID */}
                  <TableCell className="py-5">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-sm whitespace-normal max-w-50 leading-tight">
                        {user.nationalIdNumber || "N/A"}
                      </span>
                    </div>
                  </TableCell>

                  {/* Voter ID */}
                  <TableCell className="py-5">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-sm whitespace-normal max-w-50 leading-tight">
                        {user.voterIdNumber || "N/A"}
                      </span>
                    </div>
                  </TableCell>

                  {/* Date (Localised) */}
                  <TableCell className="py-5">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-sm">
                        {formatToLocalTime(user.requestDate)}
                      </span>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="py-5">
                    <Badge variant={getStatusVariant(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right py-5">
                    <div className="flex justify-end gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onReviewClick(user.userRegistrationId)}
                        className="h-9 px-3 border-border/50 hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Review
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-48 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <p>No candidates found for this constituency.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollableTableBody>
      {/* Pagination Controls */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20">
          <div className="text-sm text-muted-foreground font-medium">
            Showing <span className="text-foreground">{users.length}</span> of{" "}
            <span className="text-foreground">{data.totalCount}</span> registrations
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(data.pageNumber - 1)}
              disabled={!data.hasPreviousPage}
              className="h-9 px-3 border-border/50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center justify-center min-w-[3rem] text-sm font-semibold">
              {data.pageNumber} / {data.totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(data.pageNumber + 1)}
              disabled={!data.hasNextPage}
              className="h-9 px-3 border-border/50"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </QueryWrapper>
  );
};
