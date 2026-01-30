import { useVotingQuery } from "@/features/voting/api/voting.query.ts";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import type { VoterPartySelectOptions } from "@/features/voting/types/voting.types.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";
import { Ban, CheckCircle2 } from "lucide-react";
import { useVotingStore } from "@/stores/useVotingStore.ts";

export const PartySelection = () => {
  const selectedParty = useVotingStore((s) => s.selectedParty);
  const setSelectedParty = useVotingStore((s) => s.setSelectedParty);

  const { data, isLoading, isError, refetch } =
    useVotingQuery.getVoterParties();

  const handleSelect = (party: VoterPartySelectOptions) => {
    setSelectedParty(party);
  };
  const handleNoPartySelect = () => {
    setSelectedParty({
      partyId: -1,
      partyName: "No Vote",
      symbolContent: "",
      symbolContentType: "",
      symbolFileName: "No Vote",
    });
  };
  return (
    <QueryWrapper isLoading={isLoading} isError={isError} refetch={refetch}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {data?.map((party: VoterPartySelectOptions) => {
          const isSelected = selectedParty?.partyId === party.partyId;

          return (
            <Card
              key={party.partyId}
              onClick={() => handleSelect(party)}
              className={cn(
                "group cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden border-2 relative",
                isSelected
                  ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                  : "hover:shadow-lg hover:border-primary/30",
              )}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 z-10">
                  <CheckCircle2 className="w-6 h-6 text-primary fill-white" />
                </div>
              )}

              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="relative w-full aspect-square flex items-center justify-center bg-white rounded-lg p-2">
                  <img
                    src={`data:${party.symbolContentType};base64,${party.symbolContent}`}
                    alt={party.symbolFileName}
                    className={cn(
                      "max-w-full max-h-full object-contain transition-transform duration-300",
                      isSelected ? "scale-110" : "group-hover:scale-105",
                    )}
                  />
                </div>
                <p
                  className={cn(
                    "mt-4 font-bold text-center transition-colors",
                    isSelected ? "text-primary" : "text-foreground",
                  )}
                >
                  {party.partyName}
                </p>
              </CardContent>
            </Card>
          );
        })}

        {/* No Selection Card */}
        <Card
          onClick={() => handleNoPartySelect()}
          className={cn(
            "group cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden border-2 border-dashed relative",
            selectedParty?.partyId === -1
              ? "border-destructive bg-destructive/5 shadow-md scale-[1.02]"
              : "hover:shadow-lg hover:border-destructive/30",
          )}
        >
          {selectedParty?.partyId === -1 && (
            <div className="absolute top-2 right-2 z-10">
              <CheckCircle2 className="w-6 h-6 text-destructive fill-white" />
            </div>
          )}

          <CardContent className="p-6 flex flex-col items-center justify-center h-full">
            <div className="relative w-full aspect-square flex flex-col items-center justify-center bg-muted/30 rounded-lg p-2">
              <Ban
                className={cn(
                  "w-16 h-16 transition-colors",
                  selectedParty?.partyId === -1
                    ? "text-destructive"
                    : "text-muted-foreground group-hover:text-destructive",
                )}
              />
              <span
                className={cn(
                  "mt-4 font-bold transition-colors",
                  selectedParty?.partyId === -1
                    ? "text-destructive"
                    : "text-muted-foreground group-hover:text-destructive",
                )}
              >
                NO SELECTION
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </QueryWrapper>
  );
};
