import { create } from "zustand";
import type { ConstituencyDetail } from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";

interface ConstituencyState {
  selectedWardIds: number[];
  selectedConstituency: ConstituencyDetail | null;

  setConstituency: (constituency: ConstituencyDetail) => void;
  setSelectedWardIds: (selectedWardIds: number[]) => void;
  toggleWard: (wardId: number) => void;
}

export const useConstituencyStore = create<ConstituencyState>((set) => ({
  selectedWardIds: [],
  selectedConstituency: null,

  setConstituency: (constituency: ConstituencyDetail) => {
    set({ selectedConstituency: constituency });
  },
  setSelectedWardIds: (selectedWardIds) => {
    set(() => ({
      selectedWardIds: selectedWardIds,
    }));
  },
  toggleWard: (wardId) =>
    set((state) => ({
      selectedWardIds: state.selectedWardIds.includes(wardId)
        ? state.selectedWardIds.filter((id) => id !== wardId)
        : [...state.selectedWardIds, wardId],
    })),
}));
