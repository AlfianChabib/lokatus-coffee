import { getQuote } from "@/services/client/quote.service";
import { useQuery } from "@tanstack/react-query";

export default function useGetQuote() {
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
    refetchInterval: undefined,
  });

  return { quoteResult, isLoading, isError };
}
