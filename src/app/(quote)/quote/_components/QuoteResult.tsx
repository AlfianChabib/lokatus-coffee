"use client";

import { getQuote } from "@/services/client/quote.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { CldImage } from "next-cloudinary";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Submit from "@/components/form-fields/Submit";
import useDownloadQuote from "@/hooks/quotes/useDownloadQuote";

export default function QuoteResult() {
  const router = useRouter();

  const {
    data: quoteResult,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["quote"],
    queryFn: getQuote,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const { state, convertToPng, ref } = useDownloadQuote({ author: quoteResult?.quote.author });

  if (isError) router.push("/");
  if (isLoading || !quoteResult) return <Loading />;

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <div className="size-full" ref={ref}>
        <AspectRatio ratio={9 / 16} className="relative flex w-full items-center justify-center">
          <div className="absolute flex h-full w-full items-center justify-center">
            <CldImage
              src={quoteResult.background.contentUrl}
              alt={quoteResult.background.name}
              priority
              width={1080}
              height={1920}
              className="size-full object-cover"
            />
          </div>
          <div className="z-30 mx-4 flex flex-col rounded-md bg-gray-50/50 p-4 text-center backdrop-blur-md">
            <q className="quote">{quoteResult.quote.content}</q>
            <p>{quoteResult.quote.author}</p>
          </div>
        </AspectRatio>
      </div>
      <Submit onClick={convertToPng} disabled={state.isLoading}>
        Download
      </Submit>
    </div>
  );
}
