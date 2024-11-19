import { quotes } from "@/services/client/quote.service";
import { InferResponseType } from "hono";

export type QuoteResponse = InferResponseType<typeof quotes.index.$get>["data"][0];
export type RequestQuoteResponse = InferResponseType<typeof quotes.request.$get>["data"][0];
