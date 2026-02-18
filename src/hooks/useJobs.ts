import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";

export const useJobs = () =>
  useQuery({
    queryKey: ["jobs"],
    queryFn: async () => (await api.get("/jobs")).data
  });
