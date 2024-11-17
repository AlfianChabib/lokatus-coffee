"use client";

import { getQuote } from "@/services/client/quote.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function QuoteResult() {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["quote"],
    queryFn: getQuote,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isError) router.push("/");
  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="text-center">
        <p>{data.data.quote.content}</p>
        <p>{data.data.quote.author}</p>
      </div>
    </div>
  );
}
