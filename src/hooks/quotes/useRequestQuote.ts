import { requestQuote } from "@/services/client/quote.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useRequestQuote() {
  const ruoter = useRouter();
  const mutation = useMutation({
    mutationFn: requestQuote,
    onSuccess: (data) => {
      toast.success(data.message);
      ruoter.push("/quote");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}
