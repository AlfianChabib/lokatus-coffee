import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Info, MapPin, Menu, ScrollText } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function QuoteMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="m-0 size-8 p-0">
          <Menu strokeWidth={2} className="!size-5 text-foreground/90" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col p-4 font-inter text-blue-950/90">
        <SheetHeader>
          <SheetTitle asChild>
            <div className="flex items-center gap-2 font-montserrat">
              <Image src={"/images/logo-no-text.png"} alt="logo" width={40} height={40} />
              <div>
                <h1 className="text-xl font-semibold leading-5 text-blue-950">Lokatus Coffee.</h1>
                <p className="text-xs font-medium text-foreground/70">Start your day with coffee</p>
              </div>
            </div>
          </SheetTitle>
          <SheetDescription className="sr-only">Description</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2">
          <Link
            href="/menu"
            className="flex items-center space-x-3 rounded-md bg-blue-50/50 px-3 py-2"
          >
            <ScrollText size={20} />
            <p>Menu</p>
          </Link>
          <Link
            href="/menu"
            className="flex items-center space-x-3 rounded-md bg-blue-50/50 px-3 py-2"
          >
            <MapPin size={20} />
            <p>Location</p>
          </Link>
        </div>
        <Separator />
        <div className="flex h-full w-full flex-col justify-between">
          <div className="text-start">
            <div className="inline-flex w-full items-center space-x-2 text-foreground/90">
              <Info size={18} />
              <h2 className="font-medium text-blue-950/90">How to get a quote</h2>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="h-10">Enter passkey</AccordionTrigger>
                <AccordionContent className="text-sm text-blue-950/70">
                  Enter the passkey you received from the cashier. Passkey will change every day
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="h-10">Choose your mood</AccordionTrigger>
                <AccordionContent className="text-sm text-blue-950/70">
                  Select your mood to get quotes based on your mood, choose between happy or sad.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="h-10">Get a quote</AccordionTrigger>
                <AccordionContent className="text-sm text-blue-950/70">
                  You will get your quote based on your mood.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="h-10">Download your quote</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 text-sm text-blue-950/70">
                  <ul className="list-disc">
                    <li className="ml-3 font-medium">Android</li>
                    <blockquote className="border-l-2 pl-2 italic">
                      Press the download button below the quote, then wait for your quote to
                      downloaded.
                    </blockquote>
                  </ul>
                  <ul className="list-disc">
                    <li className="ml-3 font-medium">IPhone</li>
                    <blockquote className="border-l-2 pl-2 italic">
                      Press the expand button above the quote, then long press until a popover
                      appears, then you can save it to photos.
                    </blockquote>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="h-10">Create new quote</AccordionTrigger>
                <AccordionContent className="text-sm text-blue-950/70">
                  You can create a new quote after getting a quote, your quote will be sent to the
                  cashier who will confirm if your quote is good.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <p className="text-center text-sm text-foreground/80">
              Copyright © 2024 Lokatus Coffee
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
