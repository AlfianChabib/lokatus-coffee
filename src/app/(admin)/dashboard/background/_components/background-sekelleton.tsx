import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function BackgroundSekelleton() {
  return (
    <div className="grid w-full gap-2 md:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <AspectRatio
          ratio={9 / 16}
          className="flex items-center justify-center overflow-hidden rounded-md bg-muted"
          key={index}
        >
          <Skeleton className="h-full w-full" />
        </AspectRatio>
      ))}
    </div>
  );
}
