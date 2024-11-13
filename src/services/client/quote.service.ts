import { QuotesType } from "@/app/api/[[...route]]/quotes";
import { CreateQuoteSchema, UpdateQuoteSchema } from "@/validation/quote.validation";
import { Mood } from "@prisma/client";
import { hc } from "hono/client";

const token = localStorage.getItem("token");

export const quotes = hc<QuotesType>(`${process.env.NEXT_PUBLIC_APP_URL!}/api/quotes`, {
  headers: { Authorization: `Bearer ${token}` },
});

export async function getQuote() {
  const response = await quotes[":mood"][":passKey"].$get({
    param: { mood: "HAPPY", passKey: "passkey" },
  });

  const data = await response.json();
  if (!response.ok) return Promise.reject(data);

  return data;
}

export const createQuote = async (payload: CreateQuoteSchema) => {
  const response = await quotes.index.$post({
    json: payload,
  });

  const data = await response.json();
  if (!response.ok) return Promise.reject(data);

  return data;
};

export const getQuotes = async (query: {
  page: string;
  limit: string;
  search: string | undefined;
  mood: Mood | undefined;
  sort: string | undefined;
}) => {
  const response = await quotes.index.$get({
    query: {
      page: query.page.toString(),
      limit: query.limit.toString(),
      mood: query.mood?.toString() ?? undefined,
      search: query.search?.toString() ?? undefined,
      sort: query.sort?.toString(),
    },
  });

  const data = await response.json();
  if (!response.ok) return Promise.reject(data);

  return data;
};

export const updateQuote = async (payload: UpdateQuoteSchema) => {
  const response = await quotes[":id"].$patch({
    param: { id: payload.id },
    json: payload,
  });

  const data = await response.json();
  if (!response.ok) return Promise.reject(data);

  return data;
};

export const updateIsActive = async (payload: { id: string; isActive: boolean }) => {
  const response = await quotes.status[":id"].$patch({
    param: { id: payload.id },
    json: { isActive: payload.isActive },
  });

  const data = await response.json();
  if (!response.ok) return Promise.reject(data);

  return data;
};

export const deleteQuote = async (id: string) => {
  const response = await quotes[":id"].$delete({ param: { id } });

  const data = await response.json();
  if (!response.ok) return Promise.reject(data);

  return data;
};
