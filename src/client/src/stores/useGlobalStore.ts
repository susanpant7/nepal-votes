import { create } from "zustand";

interface GlobalState {
  workInProgress: boolean;
  setWorkInProgress: (workInProgress: boolean) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  workInProgress: false,

  setWorkInProgress: (workInProgress: boolean) => {
    set({
      workInProgress: workInProgress,
    });
  },
}));
