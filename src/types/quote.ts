import { quotes } from "@/services/client/quote.service";
import { InferResponseType } from "hono";

export type QuoteResponse = InferResponseType<typeof quotes.index.$get>["data"][0];
