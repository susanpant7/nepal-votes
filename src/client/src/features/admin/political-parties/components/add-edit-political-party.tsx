import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Flag } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useEffect, useState } from "react";
import * as React from "react";
import { ImageField } from "@/components/ui/image-field.tsx";
import type {
  AddEditPoliticalPartyRequest,
  PoliticalPartyInfo,
} from "@/features/admin/political-parties/types/admin.political-parties.types.ts";
import { UserSearchDropdown } from "@/features/users/user-search/components/user-search-dropdown.tsx";
import { useOverlayStore } from "@/stores/useOverlayStore.ts";
import { useAdminPoliticalPartyMutation } from "@/features/admin/political-parties/api/admin.political-parties.query.ts";
import { ROUTES } from "@/lib/app.routes.urls.ts";
import type { UserSearchResponse } from "@/features/users/user-search/types/user-search.types.ts";
import { AdminPage, AdminPageHeader, AdminPageContent } from "@/features/admin/layout/components/admin-page-layout.tsx";
import { Separator } from "@/components/ui/separator.tsx";

export interface AddEditPoliticalPartyProps {
  isEdit?: boolean;
  politicalPartyInfo?: PoliticalPartyInfo;
}

const AddEditPoliticalParty = (props: AddEditPoliticalPartyProps) => {
  const { isEdit, politicalPartyInfo } = props;
  const { showOverlay, hideOverlay } = useOverlayStore();
  const { addPoliticalParty, updatePoliticalParty } =
    useAdminPoliticalPartyMutation();

  const navigate = useNavigate();

  const [partyDetails, setPartyDetails] =
    useState<AddEditPoliticalPartyRequest>({
      politicalPartyId: politicalPartyInfo?.politicalPartyId || 0,
      politicalPartyName: politicalPartyInfo?.politicalPartyName || "",
      partyLeaderId: politicalPartyInfo?.partyLeaderId || 0,
      partySymbolContent: politicalPartyInfo?.partySymbolContent || null,
    });

  const [disableSave, setDisableSave] = useState<boolean>(true);

  useEffect(() => {
    setDisableSave(
      !partyDetails.politicalPartyName?.trim() ||
      !partyDetails.partySymbolContent,
    );
  }, [partyDetails]);

  const onPartyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const partyName = e.target.value;
    setPartyDetails((prev) => ({ ...prev, politicalPartyName: partyName }));
  };

  const onPartyLeaderSelected = (user: UserSearchResponse | null) => {
    if (!user) return;
    const partyLeaderId = user.userId;
    setPartyDetails((prev) => ({ ...prev, partyLeaderId: partyLeaderId }));
  };

  const onPartySymbolChange = (file: File | null) => {
    setPartyDetails((prev) => ({ ...prev, partySymbolContent: file }));
    setDisableSave(!file && !partyDetails.partySymbolContent);
  };

  const onSubmit = async (e: React.FormEvent) => {
    showOverlay();
    e.preventDefault();
    try {
      if (partyDetails.politicalPartyId > 0)
        await updatePoliticalParty.mutateAsync(partyDetails);
      else await addPoliticalParty.mutateAsync(partyDetails);
      await navigate({ to: ROUTES.ADMIN_POLITICAL_PARTIES });
    } catch (e) {
      console.log(e);
    } finally {
      hideOverlay();
    }
  };

  return (
    <AdminPage>
      <AdminPageHeader
        title={isEdit ? "Edit Party Profile" : "Create Political Party"}
        description={
          isEdit
            ? "Update the information for this political organization."
            : "Fill in the details below to register a new political party in the system."
        }
        icon={<Flag className="h-8 w-8" />}
        actions={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: ROUTES.ADMIN_POLITICAL_PARTIES })}
            className="-ml-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Back to Parties
          </Button>
        }
      />

      <AdminPageContent>
        <div className="space-y-8 max-w-5xl mx-auto pb-10">
          <Separator />

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="partyName" className="text-sm font-semibold text-foreground/80">
                  Party Name
                </Label>
                <Input
                  id="partyName"
                  type="text"
                  placeholder="Enter political party name"
                  value={partyDetails.politicalPartyName}
                  onChange={onPartyNameChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="partyLeader" className="text-sm font-semibold text-foreground/80">
                  Party Leader
                </Label>
                <UserSearchDropdown
                  onSelect={onPartyLeaderSelected}
                  currentUserName={politicalPartyInfo?.partyLeaderName?.trim() ?? ""}
                  searchLabel="Search for a leader..."
                />
              </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-xl border border-dashed border-muted-foreground/20">
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Visual Identity
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-6">
                    <ImageField
                      label="Party Symbol"
                      value={partyDetails.partySymbolContent}
                      onChange={onPartySymbolChange}
                      maxSizeMB={3}
                    />
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload a high-quality image of the party's official election symbol.
                      This symbol will be displayed on candidate profiles and ballots.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t mt-8">
              <p className="text-xs text-muted-foreground italic">
                * Ensure all party details and symbols are officially verified.
              </p>
              <Button
                type="submit"
                disabled={disableSave}
                size="lg"
                className="px-10 font-bold shadow-lg shadow-primary/20"
              >
                {isEdit ? "Update Party" : "Create Party"}
              </Button>
            </div>
          </form>
        </div>
      </AdminPageContent>
    </AdminPage>
  );
};

export default AddEditPoliticalParty;
