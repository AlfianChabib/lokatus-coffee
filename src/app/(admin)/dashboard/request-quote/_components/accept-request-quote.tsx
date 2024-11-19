"use client";

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
import useAcceptRequestQuote from "@/hooks/quotes/useAcceptRequestQuote";
import { CheckCheck } from "lucide-react";

export default function AcceptRequestQuote({ id }: { id: string }) {
  const { mutate: accept, isPending } = useAcceptRequestQuote();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"icon"} variant={"outline"} className="size-7">
          <CheckCheck className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Accept request quote</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently accept this quote.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => accept(id)} disabled={isPending}>
            Accept
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
