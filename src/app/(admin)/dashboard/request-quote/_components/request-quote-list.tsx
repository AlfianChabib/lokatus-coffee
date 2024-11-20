"use client";

import useGetRequestQuote from "@/hooks/quotes/useGetRequestQuote";
import Loading from "../loading";
import { Frown, Smile } from "lucide-react";
import UpdateRequestQuote from "./update-request-quote";
import AcceptRequestQuote from "./accept-request-quote";
import DeleteRequestQuote from "./delete-request-quote";

export default function RequestQuoteList() {
  const { data, isLoading } = useGetRequestQuote();

  if (isLoading || !data) return <Loading />;

  return (
    <div className="flex flex-col gap-2">
      {data.map((quote) => (
        <div key={quote.id} className="flex flex-col rounded-md border shadow-sm">
          <div className="flex items-center justify-between space-x-2 border-b bg-gray-50 px-2 py-1">
            <div className="flex items-center justify-center gap-2">
              {quote.mood === "HAPPY" ? (
                <Smile className="size-5" strokeWidth={2} />
              ) : (
                <Frown className="size-5" strokeWidth={2} />
              )}
              <p className="font-medium">{quote.author}</p>
            </div>
            <div className="flex space-x-1">
              <UpdateRequestQuote quote={quote} />
              <AcceptRequestQuote id={quote.id} />
              <DeleteRequestQuote id={quote.id} />
            </div>
          </div>
          <h2 className="p-2 text-gray-800">{quote.content}</h2>
        </div>
      ))}
    </div>
  );
}
