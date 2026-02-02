import { useMutation } from "@tanstack/react-query";
import { UserRegistrationApi } from "@/features/users/user-registration/api/user-registration.api.ts";
import type {
  RegenerateOtp,
  VerifyOtp,
} from "@/features/users/user-registration/types/users.user-registration.types.ts";

// --------------------------------------------------
// MUTATIONS
// --------------------------------------------------
export const useUserRegistrationMutation = () => {
  return {
    submitDetails: useMutation({
      mutationFn: (request: FormData) =>
        UserRegistrationApi.submitUserDetails(request),
    }),
    verifyOtp: useMutation({
      mutationFn: (request: VerifyOtp) =>
        UserRegistrationApi.verifyOtp(request),
    }),
    regenerateOtp: useMutation({
      mutationFn: (request: RegenerateOtp) =>
        UserRegistrationApi.regenerateOtp(request),
    }),
  };
};
