import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Info, Shield } from "lucide-react"
import {Link} from "@tanstack/react-router";

export const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center p-6 space-y-8 bg-background text-foreground">

            {/* Hero Section */}
            <div className="text-center max-w-xl space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Nepal Votes
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                    Your Voice. Your Future. Your Democracy.
                </p>
                <Button asChild size="lg" className="mt-4 shadow-lg">
                    <Link to={"/vote"}>
                        Cast Your Vote
                    </Link>
                </Button>
            </div>

            {/* Why Vote Section */}
            <Card className="w-full max-w-2xl shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-primary" /> Why Your Vote Matters
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <ul className="list-disc list-inside text-foreground">
                        <li>Your voice counts – Every vote shapes Nepal’s future.</li>
                        <li>Strengthens democracy – Participation builds transparent governance.</li>
                        <li>Accountability – Voting ensures leaders represent the people.</li>
                        <li>Civic duty – Voting is both a right and a responsibility.</li>
                    </ul>
                </CardContent>
            </Card>

            {/* Basic Things to Know Section */}
            <Card className="w-full max-w-2xl shadow-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-500" /> Before You Vote
                    </CardTitle>
                    <CardDescription>
                        Simple things every voter should check
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <ul className="list-disc list-inside text-foreground">
                        <li>Ensure you are a registered voter.</li>
                        <li>Verify your voter ID details.</li>
                        <li>Know your polling location.</li>
                        <li>Understand the voting process.</li>
                        <li>Vote freely and responsibly – your vote is private and secure.</li>
                    </ul>
                </CardContent>
            </Card>

            {/* Footer / Reminder */}
            <p className="text-center text-muted-foreground text-sm max-w-xl">
                “A strong nation is built when its citizens participate.”
            </p>
        </div>
    )
}