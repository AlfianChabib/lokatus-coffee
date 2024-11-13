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

// const ImageResult = ({
//   contentUrl,
//   name,
//   id,
// }: {
//   contentUrl: string;
//   name: string;
//   id: string;
// }) => {
//   return (
//     <AspectRatio
//       ratio={9 / 16}
//       className="flex items-center justify-center overflow-hidden rounded-md bg-muted"
//     >
//       {contentUrl && name ? (
//         <div className="relative size-full">
//           <Image
//             src={contentUrl}
//             alt={name}
//             width={1080}
//             height={1920}
//             className="size-full object-cover"
//           />
//           <div className="absolute right-0 top-0 m-1 flex md:m-2">
//             <Button variant={"outline"} className="size-8">
//               <Pencil strokeWidth={1} className="text-gray-800" />
//             </Button>
//           </div>
//         </div>
//       ) : (
//         <div className="relative flex size-full items-center justify-center border bg-muted">
//           <ImageIcon strokeWidth={1} className="size-10 text-gray-400 sm:size-14 md:size-20" />
//         </div>
//       )}
//     </AspectRatio>
//   );
// };
