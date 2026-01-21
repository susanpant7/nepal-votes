import { create } from "zustand";
import type { ConstituencyInfo } from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";

interface ConstituencyState {
  selectedWardIds: number[];
  setSelectedWardIds: (selectedWardIds: number[]) => void;
  toggleWard: (wardId: number) => void;
  clearWards: () => void;
  selectedConstituency: ConstituencyInfo | null;
  changeConstituency: (constituency: ConstituencyInfo) => void;
}

export const useConstituencyStore = create<ConstituencyState>((set) => ({
  selectedWardIds: [],
  selectedConstituency: null,

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
  clearWards: () => set({ selectedWardIds: [] }),
  changeConstituency: (constituency: ConstituencyInfo) => {
    set({ selectedConstituency: constituency });
  },
}));
