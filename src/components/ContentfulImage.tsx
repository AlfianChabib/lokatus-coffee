import { cn } from "@/lib/utils";
import { ICover } from "@/types/contentful";
import { Asset, UnresolvedLink } from "contentful";
import Image, { ImageProps } from "next/image";
import React from "react";

type ContentfulImageProps = {
  image: UnresolvedLink<"Asset"> | Asset<undefined, string> | ICover;
} & Omit<ImageProps, "src" | "alt" | "width" | "height">;

export const ContentfulImage = ({ image, ...props }: ContentfulImageProps) => {
  const assetData = image as ICover;
  const url = "https:" + assetData.fields.file.url;

  return (
    <Image
      src={url}
      alt={assetData.fields.title}
      width={assetData.fields.file.details.image.width}
      height={assetData.fields.file.details.image.height}
      // width={300}
      // height={300}
      className={cn("size-full object-cover", props.className)}
      priority
      {...props}
    />
  );
};
