import { create } from "zustand";

interface CandidateState {
  constituencyId: number | null;
  setConstituencyId: (constituencyId: number) => void;
  clearStore: () => void;
}

export const useCandidateStore = create<CandidateState>((set) => ({
  constituencyId: null,

  setConstituencyId: (constituencyId: number) => {
    set({
      constituencyId: constituencyId,
    });
  },
  clearStore: () => {
    set({
      constituencyId: null,
    });
  },
}));
