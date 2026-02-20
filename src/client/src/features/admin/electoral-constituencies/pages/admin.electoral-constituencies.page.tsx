import { ViewConstituenciesByDistrict } from "@/features/admin/electoral-constituencies/components/view-constituencies-by-district.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Plus, Map } from "lucide-react";
import { ROUTES } from "@/lib/app.routes.urls.ts";
import { useNavigate } from "@tanstack/react-router";
import { ViewWardsHierarchy } from "@/features/admin/electoral-constituencies/components/view-wards-hierarchy.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { AdminPage, AdminPageContent, AdminPageHeader } from "@/features/admin/layout/components/admin-page-layout.tsx";

export const AdminElectoralConstituenciesPage = () => {
  const navigate = useNavigate();
  const onAddConstituency = async () => {
    await navigate({ to: ROUTES.ADMIN_ELECTORAL_CONSTITUENCIES_ADD });
  };
  return (
    <AdminPage>
      <AdminPageHeader
        title="Electoral Constituencies"
        description="Manage geography-based electoral boundaries and ward mappings."
        icon={<Map className="h-8 w-8" />}
        actions={
          <Button onClick={onAddConstituency} size="sm" className="shadow-sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Constituency
          </Button>
        }
      />

      <AdminPageContent>
        <div className="pb-6">
          <Tabs defaultValue="wardsHierarchy" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="wardsHierarchy">Wards Hierarchy</TabsTrigger>
              <TabsTrigger value="byDistrict">Constituency By District</TabsTrigger>
            </TabsList>

            <TabsContent value="wardsHierarchy">
              <ViewWardsHierarchy />
            </TabsContent>

            <TabsContent value="byDistrict">
              <ViewConstituenciesByDistrict />
            </TabsContent>
          </Tabs>
        </div>
      </AdminPageContent>
    </AdminPage>
  );
};
