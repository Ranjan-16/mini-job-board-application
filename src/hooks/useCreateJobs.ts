import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";

export const useCreateJob = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.post("/jobs", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs"] })
  });
};
