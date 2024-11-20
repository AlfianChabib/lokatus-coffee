import { queryClient } from "@/lib/query-client";
import { deleteAdmin } from "@/services/client/admin.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteAdmin() {
  return useMutation({
    mutationFn: deleteAdmin,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
