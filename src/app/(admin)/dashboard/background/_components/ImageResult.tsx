import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import UpdateBackground from "./UpdateBackground";
import DeleteBackground from "./DeleteBackground";

export default function ImageResult({
  contentUrl,
  name,
  id,
}: {
  contentUrl: string;
  name: string;
  id: string;
}) {
  return (
    <AspectRatio
      ratio={9 / 16}
      className="flex items-center justify-center overflow-hidden rounded-md bg-muted"
    >
      {contentUrl && name ? (
        <div className="relative size-full">
          <Image
            src={contentUrl}
            alt={name}
            width={1080}
            height={1920}
            className="size-full object-cover"
          />
          <div className="absolute right-0 top-0 m-1 flex flex-col gap-1">
            <UpdateBackground id={id} />
            <DeleteBackground id={id} />
          </div>
        </div>
      ) : (
        <div className="relative flex size-full items-center justify-center border bg-muted">
          <ImageIcon strokeWidth={1} className="size-10 text-gray-400 sm:size-14 md:size-20" />
        </div>
      )}
    </AspectRatio>
  );
}
