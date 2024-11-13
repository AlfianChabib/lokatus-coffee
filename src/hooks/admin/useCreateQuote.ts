import { queryClient } from "@/lib/query-client";
import { createQuote } from "@/services/client/quote.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useCreateQuote() {
  return useMutation({
    mutationFn: createQuote,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
