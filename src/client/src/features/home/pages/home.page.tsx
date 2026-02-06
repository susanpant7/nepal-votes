import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Info, Shield, UserPlus, Vote } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/lib/app.routes.urls.ts";

export const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-6 space-y-8 bg-background text-foreground">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-8 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-linear-to-b from-foreground to-foreground/70 bg-clip-text">
            Nepal <span className="text-primary">Votes</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-prose mx-auto">
            Secure, transparent, and accessible digital voting.
            <span className="block italic mt-1 font-medium text-foreground/80">
              Your Voice. Your Future. Your Democracy.
            </span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto px-8 h-14 text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          >
            <Link to={ROUTES.VOTE} className="flex items-center gap-2">
              <Vote className="h-5 w-5" />
              Cast Your Vote
            </Link>
          </Button>

          <Button
            variant="outline"
            asChild
            size="lg"
            className="w-full sm:w-auto px-8 h-14 text-lg font-semibold bg-background transition-all hover:bg-secondary"
          >
            <Link to={ROUTES.AUTH_SIGN_UP} className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Register to Vote
            </Link>
          </Button>
        </div>
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
            <li>
              Strengthens democracy – Participation builds transparent
              governance.
            </li>
            <li>
              Accountability – Voting ensures leaders represent the people.
            </li>
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
            <li>
              Vote freely and responsibly – your vote is private and secure.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Footer / Reminder */}
      <p className="text-center text-muted-foreground text-sm max-w-xl">
        “A strong nation is built when its citizens participate.”
      </p>
    </div>
  );
};
