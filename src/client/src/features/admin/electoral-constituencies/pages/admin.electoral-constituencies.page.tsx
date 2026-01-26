import { ViewConstituenciesByDistrict } from "@/features/admin/electoral-constituencies/components/view-constituencies-by-district.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Plus } from "lucide-react";
import { ROUTES } from "@/lib/app.routes.urls.ts";
import { useNavigate } from "@tanstack/react-router";
import { ViewWardsHierarchy } from "@/features/admin/electoral-constituencies/components/view-wards-hierarchy.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";

export const AdminElectoralConstituenciesPage = () => {
  const navigate = useNavigate();
  const onAddConstituency = async () => {
    await navigate({ to: ROUTES.ADMIN_ELECTORAL_CONSTITUENCIES_ADD });
  };
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Constituencies</h1>

        <Button onClick={onAddConstituency}>
          <Plus className="mr-2 h-4 w-4" />
          Add Constituency
        </Button>
      </div>

      {/* Tabs */}
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
  );
};
