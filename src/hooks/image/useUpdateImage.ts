import { queryClient } from "@/lib/query-client";
import { updateBackground } from "@/services/client/background.service";
import { useSelectedImageStore } from "@/store/selected-image-store";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateImage() {
  const { setSelectedImage } = useSelectedImageStore();

  const mutation = useMutation({
    mutationFn: updateBackground,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["backgrounds"] });
      setSelectedImage(null);
      toast.success(data.message);
    },
    onError: (error) => {
      setSelectedImage(null);
      toast.error(error.message);
    },
  });

  return mutation;
}
