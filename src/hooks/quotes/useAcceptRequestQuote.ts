import { queryClient } from "@/lib/query-client";
import { acceptRequestQuote } from "@/services/client/quote.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useAcceptRequestQuote() {
  return useMutation({
    mutationFn: acceptRequestQuote,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["request-quotes"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
