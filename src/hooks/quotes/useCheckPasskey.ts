import { checkPasskey } from "@/services/client/quote.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useCheckPasskey() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: checkPasskey,
    onSuccess: (data) => {
      toast.success(data.message, { position: "top-center" });
      router.push("/mood");
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "top-center",
        duration: 5000,
      });
    },
  });

  return mutation;
}
