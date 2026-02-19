
import type { CandidateListItem } from "@/features/admin/candidates/types/admin.candidates.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";

interface CandidateListProps {
    candidates: CandidateListItem[];
}

export const CandidateList = ({ candidates }: CandidateListProps) => {
    if (candidates.length === 0) {
        return (
            <div className="text-center p-10 text-muted-foreground border border-dashed rounded-lg">
                No candidates found matching the selected criteria.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
                <Link
                    key={candidate.candidateId}
                    to="/candidate/$candidateId"
                    params={{ candidateId: candidate.candidateId.toString() }}
                    className="block h-full"
                >
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <div className="h-16 w-16 rounded-full border bg-muted p-1 overflow-hidden shrink-0">
                                <img
                                    src={candidate.candidateImageId
                                        ? `https://result.election.gov.np/Images/Candidate/${candidate.candidateImageId}.jpg`
                                        : "/placeholder-user.jpg" // Fallback to a local placeholder or just empty
                                    }
                                    alt="Candidate"
                                    className="h-full w-full object-cover rounded-full"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none'; // Hide if fails, or show placeholder
                                        e.currentTarget.parentElement?.classList.add("bg-gray-200"); // Add background
                                    }}
                                />
                                {!candidate.candidateImageId && (
                                    <div className="h-full w-full bg-gray-200 flex items-center justify-center text-xs text-center text-muted-foreground">
                                        No Img
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <CardTitle className="text-lg">{candidate.fullName}</CardTitle>
                                <div className="text-sm text-muted-foreground">
                                    {candidate.isIndependent ? (
                                        <Badge variant="outline">Independent</Badge>
                                    ) : (
                                        <span className="font-medium text-primary">{candidate.politicalPartyName}</span>
                                    )}
                                </div>
                            </div>
                            {/* Party/Independent Symbol */}
                            <div className="flex flex-col items-end ml-auto shrink-0">
                                <div className="h-10 w-10" title={candidate.isIndependent ? "Independent Symbol" : "Party Symbol"}>
                                    {candidate.symbolContent ? (
                                        <img
                                            src={`data:${candidate.symbolContentType};base64,${candidate.symbolContent}`}
                                            alt="Symbol"
                                            className="h-full w-full object-contain"
                                        />
                                    ) : null}
                                </div>
                                {candidate.isIndependent && candidate.symbolName && (
                                    <span className="text-[10px] text-muted-foreground mt-1 text-right max-w-[80px] truncate" title={candidate.symbolName}>
                                        {candidate.symbolName}
                                    </span>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm space-y-1 mt-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Constituency:</span>
                                    <span className="font-medium">{candidate.constituencyName}</span>
                                </div>
                                {/* Add more details if available in CandidateListItem */}
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
};
