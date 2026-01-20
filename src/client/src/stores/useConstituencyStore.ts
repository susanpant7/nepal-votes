import { create } from "zustand";

interface ConstituencyState {
  selectedWardIds: number[];
  toggleWard: (wardId: number) => void;
  clearWards: () => void;
}

export const useConstituencyStore = create<ConstituencyState>((set) => ({
  selectedWardIds: [],
  toggleWard: (wardId) =>
    set((state) => ({
      selectedWardIds: state.selectedWardIds.includes(wardId)
        ? state.selectedWardIds.filter((id) => id !== wardId)
        : [...state.selectedWardIds, wardId],
    })),
  clearWards: () => set({ selectedWardIds: [] }),
}));
