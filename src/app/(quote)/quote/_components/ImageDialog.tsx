"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Maximize } from "lucide-react";

export default function ImageDialog({
  imageRef,
}: {
  imageRef: React.MutableRefObject<HTMLDivElement | null>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="absolute right-2 top-2 z-20 rounded-full p-2 opacity-50" size={"icon"}>
          <Maximize />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogTitle className="sr-only">Image</DialogTitle>
        <DialogDescription className="sr-only">Image</DialogDescription>
        <div ref={imageRef} className="flex flex-col items-center justify-center"></div>
      </DialogContent>
    </Dialog>
  );
}
