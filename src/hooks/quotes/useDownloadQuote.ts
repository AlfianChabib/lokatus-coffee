import { useToPng } from "@hugocxl/react-to-image";

export default function useDownloadQuote({ author }: { author: string | undefined }) {
  const [state, convertToPng, ref] = useToPng<HTMLDivElement>({
    quality: 2,
    onSuccess: (data) => {
      const link = document.createElement("a");
      link.download = author + ".png";
      link.href = data;
      link.click();
    },
  });

  return {
    state,
    convertToPng,
    ref,
  };
}
