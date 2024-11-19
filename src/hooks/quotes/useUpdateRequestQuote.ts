import { queryClient } from "@/lib/query-client";
import { updateRequestQuote } from "@/services/client/quote.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateRequestQuote() {
  return useMutation({
    mutationFn: updateRequestQuote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["request-quotes"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
