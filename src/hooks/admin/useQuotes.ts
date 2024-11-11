import { getQuotes } from "@/services/client/quote.service";
import { useQuery } from "@tanstack/react-query";
import { useQuotesParams } from "./useQuotesParams";

export const useQuotes = () => {
  const { page, limit, search, mood, sort } = useQuotesParams();

  return useQuery({
    queryKey: ["quotes", page, limit, search, mood, sort],
    queryFn: () => getQuotes({ page, limit, search, mood, sort }),
    refetchOnWindowFocus: false,
  });
};
