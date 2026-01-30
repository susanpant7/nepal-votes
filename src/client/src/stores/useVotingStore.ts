import { create } from "zustand";
import type {
  VoterCandidateSelectOptions,
  VoterPartySelectOptions,
} from "@/features/voting/types/voting.types.ts";

interface VotingState {
  selectedCandidate: VoterCandidateSelectOptions | null;
  selectedParty: VoterPartySelectOptions | null;

  setSelectedCandidate: (
    selectedCandidate: VoterCandidateSelectOptions,
  ) => void;
  setSelectedParty: (selectedParty: VoterPartySelectOptions) => void;
  clearStore: () => void;
}

export const useVotingStore = create<VotingState>((set) => ({
  selectedCandidate: null,
  selectedParty: null,

  setSelectedCandidate: (selectedCandidate: VoterCandidateSelectOptions) => {
    set({
      selectedCandidate: selectedCandidate,
    });
  },
  setSelectedParty: (selectedParty: VoterPartySelectOptions) => {
    set({
      selectedParty: selectedParty,
    });
  },
  clearStore: () => {
    set({
      selectedCandidate: null,
      selectedParty: null,
    });
  },
}));
