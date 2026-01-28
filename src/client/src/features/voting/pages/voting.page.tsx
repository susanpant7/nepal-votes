import { useState } from "react";
import type { VotingSection } from "@/features/voting/types/voting.types.ts";
import { EligibilitySection } from "@/features/voting/components/eligibility-section.tsx";
import { InfoSection } from "@/features/voting/components/info-section.tsx";
import { BallotSection } from "@/features/voting/components/ballot-section.tsx";
import { ConfirmSection } from "@/features/voting/components/confirm-section.tsx";
import { SuccessSection } from "@/features/voting/components/success-section.tsx";

export const VotingPage = () => {
  const [section, setSection] = useState<VotingSection>("ELIGIBILITY");

  const onSectionChange = (step: VotingSection) => {
    setSection(step);
  };
  return (
    <div className="min-h-screen p-6">
      <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {section === "ELIGIBILITY" && (
          <EligibilitySection gotoSection={onSectionChange} />
        )}
        {section === "INFO" && <InfoSection gotoSection={onSectionChange} />}
        {section === "BALLOT" && (
          <BallotSection gotoSection={onSectionChange} />
        )}
        {section === "CONFIRM" && (
          <ConfirmSection gotoSection={onSectionChange} />
        )}
        {section === "SUCCESS" && <SuccessSection />}
      </main>
    </div>
  );
};
