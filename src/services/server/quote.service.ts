import { signQuoteToken } from "@/common/server/jsonwebtoken";
import prisma from "@/lib/prisma";
import { QuoteTokenPayload } from "@/types/server";
import { getNextDay } from "@/utils/constants";
import { getRandomBackgroundId, getRandomQuoteId } from "@/utils/getRandomQuoteId";
import { GetQuotesSchema } from "@/validation/quote.validation";
import { Mood, Prisma } from "@prisma/client";
import { Context } from "hono";
import { env } from "hono/adapter";
import { setCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";

export const getQuote = async (payload: QuoteTokenPayload) => {
  const quote = await prisma.quote.findFirst({ where: { id: payload.quoteId } });
  if (!quote) throw new HTTPException(404, { message: "No quote found" });

  const background = await prisma.background.findFirst({ where: { id: payload.backgroundId } });
  if (!background) throw new HTTPException(404, { message: "No background found" });

  return { quote, background };
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

export const postMood = async (mood: Mood, c: Context) => {
  const { QUOTE_JWT_SECRET, NODE_ENV } = env(c);
  const isDev = NODE_ENV === "development";

  const quoteId = await getRandomQuoteId(mood);
  const backgroundId = await getRandomBackgroundId();

  const quoteToken = signQuoteToken({ quoteId, backgroundId }, QUOTE_JWT_SECRET);

  setCookie(c, "quote", quoteToken, {
    path: "/",
    httpOnly: true,
    sameSite: "Lax",
    ...(isDev ? { maxAge: 60 * 60 } : { expires: getNextDay() }),
    secure: process.env.NODE_ENV === "production",
  });
};
