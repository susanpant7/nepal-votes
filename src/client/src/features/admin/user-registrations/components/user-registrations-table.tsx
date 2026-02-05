import { useAdminUserRegistrationQuery } from "@/features/admin/user-registrations/api/admin.user-registrations.query.ts";
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

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { formatToLocalTime } from "@/lib/date-formatter.ts";
import type { VariantProps } from "class-variance-authority";
import { Badge, type badgeVariants } from "@/components/ui/badge.tsx";
import { ROUTES } from "@/lib/app.routes.urls.ts";
import { useNavigate } from "@tanstack/react-router";

export interface UserRegistrationsTableProps {
  districtId: number;
}
export const UserRegistrationsTable = ({
  districtId,
}: UserRegistrationsTableProps) => {
  const { data, isLoading, isError, refetch } =
    useAdminUserRegistrationQuery.getRegisteredUsersByDistrictId(districtId);

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

  const users = data ?? [];

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

                  {/* Voting Place */}
                  <TableCell className="py-5">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-sm whitespace-normal max-w-50 leading-tight">
                        {user.nationalIdNumber}
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
                  colSpan={6}
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
    </QueryWrapper>
  );
};
