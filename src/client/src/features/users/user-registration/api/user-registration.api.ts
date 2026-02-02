import apiClient from "@/api/api.client.ts";
import { USER_REGISTRATION_ENDPOINTS } from "@/features/users/user-registration/api/user-registration.endpoints.ts";
import type {
  RegenerateOtp,
  VerifyOtp,
} from "@/features/users/user-registration/types/users.user-registration.types.ts";

export const UserRegistrationApi = {
  submitUserDetails: async (formData: FormData): Promise<boolean> =>
    apiClient.post(USER_REGISTRATION_ENDPOINTS.SUBMIT_USER_DETAILS, formData),
  verifyOtp: async (verifyOtp: VerifyOtp): Promise<boolean> =>
    apiClient.post(USER_REGISTRATION_ENDPOINTS.VERIFY_OTP, verifyOtp),
  regenerateOtp: async (regenerateOtp: RegenerateOtp): Promise<boolean> =>
    apiClient.post(USER_REGISTRATION_ENDPOINTS.REGENERATE_OTP, regenerateOtp),
};
