import Image from "next/image";
import { Icon } from "./lucide-icon";
import { useSelectedImageStore } from "@/store/selected-image-store";
import { AspectRatio } from "./ui/aspect-ratio";

export const DisplaySelectedImage = () => {
  const { selectedImage } = useSelectedImageStore();

  return (
    <div className="flex w-full max-w-[250px] items-center justify-center rounded-md border-2 border-gray-200 bg-slate-200 md:max-w-[250px]">
      <AspectRatio ratio={9 / 16} className="flex items-center justify-center bg-muted">
        {selectedImage ? (
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt="selected"
            width={1080}
            height={1920}
            className="h-full w-full rounded-md object-cover"
          />
        ) : (
          <Icon name="Image" strokeWidth={1} className="size-10 text-slate-400 md:size-20" />
        )}
      </AspectRatio>
    </div>
  );
};
