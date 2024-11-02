"use client";

import { getQuotes } from "@/services/client/quote.service";
import { useQuery } from "@tanstack/react-query";

export default function QuoteResult() {
  const { data } = useQuery({
    queryKey: ["quote"],
    queryFn: getQuotes,
  });

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="text-center">
        <p>{data.data.content}</p>
        <p>{data.data.author}</p>
      </div>
    </div>
  );
}
