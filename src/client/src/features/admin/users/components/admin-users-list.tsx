import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EditDeleteAction } from "@/components/actions/edit-delete-action";
import type { UserListItem } from "../types/admin.users.types";
import { User, Phone, IdCard, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useConfirm } from "@/components/confirm/confirm-dialogbox.provider";
import { Button } from "@/components/ui/button";

interface Props {
    users: UserListItem[];
    totalCount: number;
    page: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onEdit: (user: UserListItem) => void;
    onDelete: (userId: number) => void;
}

export const AdminUsersList = ({
    users,
    totalCount,
    page,
    pageSize,
    onPageChange,
    onEdit,
    onDelete
}: Props) => {
    const confirm = useConfirm();

    const totalPages = Math.ceil(totalCount / pageSize);

    const handleDelete = async (userId: number) => {
        const isConfirmed = await confirm({
            title: "Delete User",
            description: "Are you sure you want to delete this user? This action cannot be undone.",
        });
        if (isConfirmed) {
            onDelete(userId);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-auto min-h-0 border rounded-xl bg-card shadow-sm">
                <Table className="relative">
                    <TableHeader className="bg-muted/50 sticky top-0 z-10 shadow-sm">
                        <TableRow>
                            <TableHead className="bg-muted/50">User Information</TableHead>
                            <TableHead className="bg-muted/50">Contact & ID</TableHead>
                            <TableHead className="bg-muted/50">Location</TableHead>
                            <TableHead className="bg-muted/50">Roles & Status</TableHead>
                            <TableHead className="bg-muted/50 text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                    No users found matching the criteria.
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.userId}>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold flex items-center gap-2">
                                                <User className="h-4 w-4 text-primary" />
                                                {user.fullNameEn}
                                            </span>
                                            <span className="text-sm text-muted-foreground">{user.fullNameNp}</span>
                                            <span className="text-xs text-muted-foreground mt-1">
                                                DOB: {user.dateOfBirth} ({user.age} yrs)
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-3 w-3 text-muted-foreground" />
                                                {user.mobileNumber}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <IdCard className="h-3 w-3 text-muted-foreground" />
                                                Voter ID: {user.voterIdNumber}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <IdCard className="h-3 w-3 text-muted-foreground" />
                                                National ID: {user.nationalIdNumber}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm">
                                            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                                            <div>
                                                <p className="font-medium">Ward {user.wardNumber}, {user.municipalityName}</p>
                                                <p className="text-xs text-muted-foreground">{user.districtName}, {user.provinceName}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-wrap gap-1">
                                                {user.roles.map((role) => (
                                                    <Badge key={role} variant="outline" className="text-[10px] uppercase">
                                                        {role}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <Badge className="w-fit text-[10px] uppercase" variant={user.status === "Approved" ? "default" : "secondary"}>
                                                {user.status}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <EditDeleteAction
                                            onEditClick={() => onEdit(user)}
                                            onDeleteClick={() => handleDelete(user.userId)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex-none flex items-center justify-between px-2 py-4 border-t bg-background/50 backdrop-blur-sm sticky bottom-0">
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-medium">{(page - 1) * pageSize + 1}</span> to{" "}
                        <span className="font-medium">{Math.min(page * pageSize, totalCount)}</span> of{" "}
                        <span className="font-medium">{totalCount}</span> results
                    </p>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(page - 1)}
                            disabled={page === 1}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                        </Button>
                        <div className="text-sm font-medium">
                            Page {page} of {totalPages}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPageChange(page + 1)}
                            disabled={page === totalPages}
                        >
                            Next <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
