import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <AspectRatio ratio={9 / 16} className="flex w-full max-w-[80%] items-center justify-center">
        <Skeleton className="size-full" />
      </AspectRatio>
    </div>
  );
}
