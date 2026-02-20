import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AdminUserRegistrationsPage } from "@/features/admin/user-registrations/pages/admin.user-registrations.page.tsx";

const userRegistrationSearchSchema = z.object({
  districtId: z.number().optional(),
  searchTerm: z.string().optional().catch(""),
  pageNumber: z.number().optional().catch(1),
});

export const Route = createFileRoute("/_admin/admin/user-registrations/")({
  validateSearch: (search) => userRegistrationSearchSchema.parse(search),
  component: AdminUserRegistrationsPage,
});
