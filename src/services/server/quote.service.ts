import prisma from "@/lib/prisma";
import { getNextDay } from "@/utils/constants";
import { getRandomQuoteId } from "@/utils/getRandomQuoteId";
import { GetQuotesSchema } from "@/validation/quote.validation";
import { Mood, Prisma } from "@prisma/client";
import { Context } from "hono";
import { setCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";

export const getQuote = async (mood: Mood, c: Context) => {
  const quoteId = await getRandomQuoteId(mood);
  const quote = await prisma.quote.findFirst({
    where: { id: quoteId, isActive: true, canShow: true },
  });

  if (!quote) throw new HTTPException(404, { message: "No quote found" });

  setCookie(c, "quoteid", quote.id, {
    path: "/",
    httpOnly: true,
    sameSite: "Lax",
    expires: getNextDay(),
    secure: process.env.NODE_ENV === "production",
  });

  return quote;
};

export const getQuotes = async (query: GetQuotesSchema) => {
  const { limit, page, search, mood, sort } = query;

  const sortBy = [];

  if (sort) {
    const [key, order] = sort.split("_") as [
      Prisma.QuoteOrderByWithAggregationInput,
      Prisma.SortOrder,
    ];
    sortBy.push(key, order);
  }

  const quotes = await prisma.quote.findMany({
    where: {
      AND: [{ content: { contains: search, mode: "insensitive" } }, ...(mood ? [{ mood }] : [])],
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { [sortBy[0].toString()]: sortBy[1].toString() },
  });

  const total = await prisma.quote.count({
    where: {
      AND: [{ content: { contains: search, mode: "insensitive" } }, ...(mood ? [{ mood }] : [])],
    },
  });

  if (!quotes) throw new HTTPException(404, { message: "Not Found" });
  return { quotes, total };
};

export const getMeta = (total: number, page: number, limit: number) => {
  const totalPage = Math.ceil(total / limit);

  return {
    totalData: total,
    currentPage: page,
    totalPage: totalPage,
    limit: limit,
    nextPage: page < totalPage ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
    canNext: page * limit < total,
    canPrev: page > 1,
  };
};
