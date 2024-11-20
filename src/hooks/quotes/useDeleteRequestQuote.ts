import { queryClient } from "@/lib/query-client";
import { deleteRequestQuote } from "@/services/client/quote.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteRequestQuote() {
  return useMutation({
    mutationFn: deleteRequestQuote,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["request-quotes"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
