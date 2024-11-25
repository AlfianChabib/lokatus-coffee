"use client";

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
import { useState } from "react";
import useGetQuote from "@/hooks/quotes/useGetQuote";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Maximize } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuoteResult() {
  const { quoteResult, isLoading, isError } = useGetQuote();
  const { state, convertToPng, ref, downloadImage, imageRef, openDialog, setOpenDialog } =
    useDownloadQuote({ author: quoteResult?.quote.author });
  const [loadedImage, setLoadedImage] = useState(0);

  const router = useRouter();

  if (isError) router.push("/");
  if (isLoading || !quoteResult) return <Loading />;

  return (
    <div className="my-16 flex h-full w-full flex-col gap-2">
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogTrigger>
          <span className="sr-only">Alert</span>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[96%] rounded-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Successfully downloaded</AlertDialogTitle>
            <AlertDialogDescription>
              Congrats you have successfully downloaded the quote, check your download folder.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Link href={"/request"}>Post Quote</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="relative size-full overflow-hidden rounded-lg shadow-xl">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="absolute right-2 top-2 z-20 rounded-full p-2 opacity-50"
              size={"icon"}
              onClick={convertToPng}
            >
              <Maximize />
            </Button>
          </DialogTrigger>
          <DialogContent className="flex w-[96%] overflow-hidden rounded-md border-none p-0">
            <DialogTitle className="sr-only">Image</DialogTitle>
            <DialogDescription className="sr-only">Image</DialogDescription>
            {state.isLoading && <Skeleton className="flex h-full w-[96%]" />}
            <div className="relative flex">
              <div ref={imageRef}></div>
            </div>
          </DialogContent>
        </Dialog>
        <AspectRatio
          ref={ref}
          ratio={9 / 16}
          className={`relative flex w-full items-center justify-center`}
        >
          <div className="absolute flex h-full w-full items-center justify-center">
            <CldImage
              src={quoteResult.background.contentUrl}
              alt={quoteResult.background.name}
              priority
              width={1080}
              height={1920}
              onLoadCapture={() => {
                setLoadedImage(loadedImage + 1);
              }}
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
                  src="/images/logo-transparent.png"
                  alt="logo transparent"
                  priority
                  width={230}
                  height={230}
                  onLoadCapture={() => {
                    setLoadedImage(loadedImage + 1);
                  }}
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
      <div className="flex w-full gap-2">
        <Submit onClick={downloadImage} disabled={state.isLoading} className="w-full">
          Download
        </Submit>
        <Link
          href={"/request"}
          className={buttonVariants({ variant: "outline", className: "w-full" })}
        >
          Post Quote
        </Link>
      </div>
    </div>
  );
}
