import { queryClient } from "@/lib/query-client";
import { createAdmin } from "@/services/client/admin.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useCreateAdmin() {
  return useMutation({
    mutationFn: createAdmin,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
