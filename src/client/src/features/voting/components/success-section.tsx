import { CheckCircle2 } from "lucide-react";

export const SuccessSection = () => {
  return (
    <div className="text-center space-y-4 py-20">
      <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto" />
      <h1 className="text-4xl font-bold">Vote Cast Successfully!</h1>
      <p className="text-muted-foreground">
        Your contribution to the democratic process has been recorded.
      </p>
    </div>
  );
};
