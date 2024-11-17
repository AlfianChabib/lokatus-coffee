"use client";

import { getQuote } from "@/services/client/quote.service";
import { useQuery } from "@tanstack/react-query";

export default function QuoteResult() {
  const { data } = useQuery({
    queryKey: ["quote"],
    queryFn: getQuote,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="text-center">
        <p>{data.data.quote.content}</p>
        <p>{data.data.quote.author}</p>
      </div>
    </div>
  );
}
