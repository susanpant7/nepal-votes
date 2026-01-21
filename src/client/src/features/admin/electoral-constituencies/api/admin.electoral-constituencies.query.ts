import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminElectoralConstituencyApi } from "@/features/admin/electoral-constituencies/api/admin.electoral-constituencies.api.ts";
import type {
  AddConstituencyRequest,
  EditConstituencyRequest,
} from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";

export const ADMIN_CONSTITUENCY_KEYS = {
  getConstituencies: ["getConstituencies"] as const,
  addConstituency: ["addConstituency"] as const,
  editConstituency: ["updateConstituency"] as const,
};

export const useAdminConstituencyQuery = {
  getConstituencies: () =>
    useQuery({
      queryKey: ADMIN_CONSTITUENCY_KEYS.getConstituencies,
      queryFn: AdminElectoralConstituencyApi.getConstituencies,
      refetchOnMount: true,
      staleTime: 5 * 60 * 1000,
    }),
};

export const useAdminConstituencyMutation = () => {
  const invalidateConstituencies = refreshConstituencies();

  const addConstituency = useMutation({
    mutationFn: (party: AddConstituencyRequest) =>
      AdminElectoralConstituencyApi.addConstituency(party),
    onSuccess: invalidateConstituencies,
  });

  const updateConstituency = useMutation({
    mutationFn: (party: EditConstituencyRequest) =>
      AdminElectoralConstituencyApi.editConstituency(party),
    onSuccess: invalidateConstituencies,
  });

  return {
    addConstituency,
    updateConstituency,
  };
};

const refreshConstituencies = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: ADMIN_CONSTITUENCY_KEYS.getConstituencies,
    });
};
