import { queryClient } from "@/lib/query-client";
import { deleteQuote } from "@/services/client/quote.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useDeleteQuote() {
  return useMutation({
    mutationFn: deleteQuote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });
}
