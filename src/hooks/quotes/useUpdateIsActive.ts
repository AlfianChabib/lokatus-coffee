import { queryClient } from "@/lib/query-client";
import { updateIsActive } from "@/services/client/quote.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateIsActive() {
  return useMutation({
    mutationFn: updateIsActive,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
