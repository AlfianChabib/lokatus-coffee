import { useToPng } from "@hugocxl/react-to-image";
import { toast } from "sonner";
import { useCallback, useRef, useState } from "react";
import useDownloader from "react-use-downloader";

export default function useDownloadQuote({ author }: { author: string | undefined }) {
  const [displayImage, setDisplayImage] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { download } = useDownloader({
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="${author}.png"`,
    },
  });

  const [state, convertToPng, ref] = useToPng<HTMLDivElement>({
    quality: 2,
    onSuccess: (data) => {
      setImage(data);
      const image = new Image();
      image.src = data;
      imageRef.current?.appendChild(image);
      setDisplayImage(true);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const downloadImage = useCallback(() => {
    convertToPng();
    download(image!, author + ".png")
      .then(() => {
        toast.success("Downloaded successfully");
        setOpenDialog(true);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [convertToPng, download, image, author]);

  return {
    state,
    convertToPng,
    ref,
    displayImage,
    downloadImage,
    imageRef,
    openDialog,
    setOpenDialog,
  };
}
