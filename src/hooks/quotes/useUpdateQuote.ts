import { queryClient } from "@/lib/query-client";
import { updateQuote } from "@/services/client/quote.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateQuote = () => {
  const mutate = useMutation({
    mutationFn: updateQuote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};

// <
//     InferResponseType<typeof quotes[":id"]["$patch"]>,
//     Error,
//     InferRequestType<typeof quotes[":id"]["$patch"]>["param"],
//     InferRequestType<typeof quotes[":id"]["$patch"]>["json"]
//   >
