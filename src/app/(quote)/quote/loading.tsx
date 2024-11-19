import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <AspectRatio ratio={9 / 16} className="mx-auto flex w-full items-center justify-center px-2">
        <Skeleton className="size-full" />
      </AspectRatio>
    </div>
  );
}
