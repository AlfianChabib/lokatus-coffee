"use client";

import useGetBackgrounds from "@/hooks/image/useGetBackgrounds";
import BackgroundSekelleton from "./background-sekelleton";
import ImageResult from "./ImageResult";

export default function BackgroundList() {
  const { data: backgrounds, isLoading } = useGetBackgrounds();

  if (isLoading || !backgrounds?.data) return <BackgroundSekelleton />;

  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <ImageResult
          key={index}
          id={backgrounds.data[index]?.id}
          contentUrl={backgrounds.data[index]?.contentUrl}
          name={backgrounds.data[index]?.name}
        />
      ))}
    </div>
  );
}
