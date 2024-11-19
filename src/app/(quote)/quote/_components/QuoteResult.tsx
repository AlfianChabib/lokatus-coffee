"use client";

import { getQuote } from "@/services/client/quote.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import { CldImage } from "next-cloudinary";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Submit from "@/components/form-fields/Submit";
import useDownloadQuote from "@/hooks/quotes/useDownloadQuote";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import QuoteIconGray from "@/components/svgs/quoteIconGray";
import QuoteIconWhite from "@/components/svgs/quoteIconWhite";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";

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
      <div className="size-full overflow-hidden rounded-lg shadow-xl">
        <AspectRatio
          ratio={9 / 16}
          className="relative flex w-full items-center justify-center"
          ref={ref}
        >
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
          <div
            className={cn(
              "relative z-30 mx-4 flex w-full flex-col gap-2 overflow-hidden rounded-xl font-montserrat",
              "bg-[#404042]",
            )}
          >
            <span className="absolute top-10 z-20 h-[40rem] w-[40rem] origin-top-left rotate-17 bg-white" />
            <span className="absolute top-9 z-[11] h-[40rem] w-[40rem] origin-top-left rotate-17 bg-stone-800 blur-lg" />
            <QuoteIconWhite />
            <div className="relative z-20 mt-16 flex flex-col p-6">
              <div className="absolute left-0 top-0 flex w-full items-center justify-center opacity-60">
                <Image
                  src="/logo-transparent.png"
                  alt="logo transparent"
                  priority
                  width={230}
                  height={230}
                  className="mt-8"
                />
              </div>
              <h2 className="text-4xl font-bold text-[#282828]">Quote.</h2>
              <div className="mt-4 space-y-4">
                <p className="text-sm font-medium text-stone-700">{quoteResult.quote.content}</p>
                <Separator className="w-20 bg-stone-700" />
                <div className="flex flex-col">
                  <p className="text-sm">added by</p>
                  <p className="text-lg font-semibold text-[#282828]">
                    {quoteResult.quote.author}.
                  </p>
                </div>
              </div>
              <div className="inline-flex w-full justify-end">
                <QuoteIconGray />
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 flex w-full items-center justify-center gap-2 text-gray-50">
            <InstagramLogoIcon className="size-5" />
            <p className="leading-6">lokatusbogor</p>
          </div>
        </AspectRatio>
      </div>
      <Submit onClick={convertToPng} disabled={state.isLoading}>
        Download
      </Submit>
    </div>
  );
}
