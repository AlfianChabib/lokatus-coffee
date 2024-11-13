import { queryClient } from "@/lib/query-client";
import { deleteBackground } from "@/services/client/background.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteBackground() {
  return useMutation({
    mutationFn: deleteBackground,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["backgrounds"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
