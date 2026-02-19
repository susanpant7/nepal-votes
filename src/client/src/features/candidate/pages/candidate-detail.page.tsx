import { useState } from "react";
import { useParams, Link } from "@tanstack/react-router";
import { useCandidateQuery } from "@/features/candidate/api/candidate.query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Flag, User } from "lucide-react";

export const CandidateDetailPage = () => {
    const { candidateId } = useParams({ from: "/candidate/$candidateId" });
    const { data: candidate, isLoading, isError } = useCandidateQuery.useGetCandidateById(Number(candidateId));

    const [imageError, setImageError] = useState(false);

    if (isLoading) {
        return (
            <div className="flex justify-center p-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (isError || !candidate) {
        return (
            <div className="container mx-auto py-8 px-4 text-center">
                <h2 className="text-2xl font-bold text-destructive mb-4">Candidate not found</h2>
                <Button asChild variant="outline">
                    <Link to="/candidate">Back to List</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-6">
                <Button asChild variant="ghost" className="pl-0 hover:bg-transparent">
                    <Link to="/candidate" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Candidates
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Candidate Image */}
                <div className="md:col-span-1">
                    <Card className="overflow-hidden">
                        <CardContent className="p-6 flex flex-col items-center">
                            <div className="h-48 w-48 rounded-full border-4 border-muted p-2 overflow-hidden bg-muted/20 mb-6 flex items-center justify-center">
                                {!imageError && candidate.candidateImageId ? (
                                    <img
                                        src={`https://result.election.gov.np/Images/Candidate/${candidate.candidateImageId}.jpg`}
                                        alt="Candidate"
                                        className="h-full w-full object-cover rounded-full"
                                        onError={() => setImageError(true)}
                                    />
                                ) : (
                                    <User className="h-24 w-24 text-muted-foreground/50" />
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-center mb-2">{candidate.fullName}</h2>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {candidate.isIndependent ? (
                                    <Badge variant="outline" className="text-lg py-1 px-3">Independent</Badge>
                                ) : (
                                    <Badge variant="secondary" className="text-lg py-1 px-3">{candidate.politicalPartyName}</Badge>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Details */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Candidate Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                                    <div>
                                        <h3 className="font-medium">Constituency</h3>
                                        {/* Note: constituencyName might not be in CandidateDetail based on current type definition. 
                        If not, we might need to fetch it or update the backend DTO. 
                        Assuming it's available or we can derive it. 
                        Checking the type definition again, CandidateDetail has constituencyId but not Name.
                        The list item had constituencyName. 
                        Let's check if we can get it or if we need to fetch constituency details separately or update backend.
                        For now, I'll display ID and maybe subsequent update to backend is needed if name is missing.
                        Wait, CandidateDetail usually has basic info. Let's check the type file again.
                    */}
                                        <p className="text-muted-foreground">Constituency ID: {candidate.constituencyId}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                                    <Flag className="h-5 w-5 text-primary mt-0.5" />
                                    <div>
                                        <h3 className="font-medium">Political Affiliation</h3>
                                        <p className="text-muted-foreground">
                                            {candidate.isIndependent ? "Independent Candidate" : candidate.politicalPartyName}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                <h3 className="font-medium mb-2">Election Symbol</h3>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded border p-1">
                                        {candidate.symbolContent && (
                                            <img
                                                src={`data:${candidate.symbolContentType};base64,${candidate.symbolContent}`}
                                                alt="Symbol"
                                                className="h-full w-full object-contain"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{candidate.candidateSymbolFileName}</p>
                                        <p className="text-xs text-muted-foreground">Official Ballot Symbol</p>
                                        {candidate.symbolName && (
                                            <p className="text-xs font-medium mt-1">Symbol Name: {candidate.symbolName}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </CardContent>
                    </Card>

                    {/* Placeholder for Manifesto or Bio if available in future */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Manifesto / Bio</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground italic">
                                No detailed manifesto or biography information available for this candidate yet.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
