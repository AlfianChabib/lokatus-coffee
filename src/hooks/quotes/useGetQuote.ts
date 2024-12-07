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
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });

  return { quoteResult, isLoading, isError };
}
