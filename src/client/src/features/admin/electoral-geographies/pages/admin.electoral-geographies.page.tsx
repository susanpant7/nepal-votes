import { GeographicalDivisionPage } from "@/features/admin/electoral-geographies/components/geographical-division-page.tsx";
import { useAuthStore } from "@/stores/useAuthStore.ts";

export const AdminElectoralGeographiesPage = () => {
  const user = useAuthStore.getState().user;
  const isAdmin = user?.isAdmin === true;
  return <GeographicalDivisionPage allowAddEdit={isAdmin} />;
};
