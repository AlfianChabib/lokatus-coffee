import { queryClient } from "@/lib/query-client";
import { updateAdmin } from "@/services/client/admin.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateAdmin() {
  return useMutation({
    mutationFn: updateAdmin,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
