import { useNavigate } from "@tanstack/react-router";
import { useGlobalStore } from "@/stores/useGlobalStore.ts";
import { useConstituencyStore } from "@/stores/useConstituencyStore.ts";
import { useConfirm } from "@/components/confirm/confirm-dialogbox.provider.tsx";
import { useCandidateStore } from "@/stores/useCandidateStore.ts";

export const useAppNavigation = () => {
  const workInProgress = useGlobalStore((s) => s.workInProgress);
  const setWorkInProgress = useGlobalStore((s) => s.setWorkInProgress);
  const selectedWards = useConstituencyStore((s) => s.selectedWardIds);
  const setSelectedWards = useConstituencyStore((s) => s.setSelectedWardIds);
  const navigate = useNavigate();
  const confirm = useConfirm();
  const clearCandidateStore = useCandidateStore((s) => s.clearStore);
  const handleNavigation = async (
    url: string,
    confirmMessage = "You have unsaved changes. Are you sure you want to leave this page?",
  ) => {
    clearStoreValues();
    await handleUnsavedWork(url, confirmMessage);
  };

  const handleUnsavedWork = async (url: string, confirmMessage: string) => {
    if (hasUnsavedWork()) {
      await showWorkInProgressWarning(url, confirmMessage);
    } else {
      await navigate({ to: url });
    }
  };
  const hasUnsavedWork = () => {
    if (selectedWards.length > 0 || workInProgress) {
      return true;
    }
    // add other conditions here that indicates that some work is in progress
    return false;
  };

  const showWorkInProgressWarning = async (
    url: string,
    confirmMessage: string,
  ) => {
    const isConfirmed = await confirm({
      title: "Switch Page?",
      description: confirmMessage,
    });

    if (isConfirmed) {
      // Reset store values (clear global page state)
      setSelectedWards([]);
      setWorkInProgress(false);

      // Navigate to desired page
      await navigate({ to: url });
    }
  };

  const clearStoreValues = () => {
    clearCandidateStore();
  };

  return { handleNavigation };
};
