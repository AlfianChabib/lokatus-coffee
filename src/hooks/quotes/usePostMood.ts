import { postMood } from "@/services/client/quote.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function usePostMood() {
  const router = useRouter();

  return useMutation({
    mutationFn: postMood,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/quote");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
