import { useToPng } from "@hugocxl/react-to-image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useDownloadQuote({ author }: { author: string | undefined }) {
  const ruoter = useRouter();

  const [state, convertToPng, ref] = useToPng<HTMLDivElement>({
    quality: 2,
    onSuccess: (data) => {
      const link = document.createElement("a");
      link.download = author + ".png";
      link.href = data;
      link.click();
      ruoter.push("/request");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return {
    state,
    convertToPng,
    ref,
  };
}
