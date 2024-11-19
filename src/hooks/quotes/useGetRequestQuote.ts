import { getRequestQuotes } from "@/services/client/quote.service";
import { useQuery } from "@tanstack/react-query";

export default function useGetRequestQuote() {
  return useQuery({
    queryKey: ["request-quotes"],
    queryFn: getRequestQuotes,
  });
}
