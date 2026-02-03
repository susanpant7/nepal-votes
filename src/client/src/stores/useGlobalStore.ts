import { create } from "zustand";

interface GlobalState {
  workInProgress: boolean;
  setWorkInProgress: (workInProgress: boolean) => void;

  userRegistrationDistrictId: number | null;
  setUserRegistrationDistrictId: (userRegistrationDistrictId: number) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  workInProgress: false,

  setWorkInProgress: (workInProgress: boolean) => {
    set({
      workInProgress: workInProgress,
    });
  },

  userRegistrationDistrictId: null,
  setUserRegistrationDistrictId: (id: number) => {
    set({ userRegistrationDistrictId: id });
  },
}));
