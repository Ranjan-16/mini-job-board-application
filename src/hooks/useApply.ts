import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";

export const useApply = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data:any)=> api.post("/applications", data),
    onSuccess: ()=>{
      qc.invalidateQueries({ queryKey:["applications"] });
    }
  });
};
