import { signQuoteToken } from "@/common/server/jsonwebtoken";
import prisma from "@/lib/prisma";
import { QuoteTokenPayload } from "@/types/server";
import { getNextDay } from "@/utils/constants";
import { getRandomBackgroundId, getRandomQuoteId } from "@/utils/getRandomQuoteId";
import {
  GetQuotesSchema,
  RequestQuoteSchema,
  UpdateQuoteStatusSchema,
  UpdateRequestQuoteSchema,
} from "@/validation/quote.validation";
import { Mood, Prisma } from "@prisma/client";
import { Context } from "hono";
import { env } from "hono/adapter";
import { setCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import { getPasskey } from "./admin.service";

export const getQuote = async (payload: QuoteTokenPayload) => {
  const quote = await prisma.quote.findFirst({ where: { id: payload.quoteId } });
  if (!quote) throw new HTTPException(404, { message: "No quote found" });

  const background = await prisma.background.findFirst({ where: { id: payload.backgroundId } });
  if (!background) throw new HTTPException(404, { message: "No background found" });

  return { quote, background };
};

export const updateStatusQuote = async (payload: UpdateQuoteStatusSchema) => {
  const quote = await prisma.quote.update({
    where: { id: payload.id },
    data: { isActive: payload.isActive },
  });
  if (!quote) throw new HTTPException(404, { message: "Quote not found" });

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
      status: "APPROVED",
      AND: [{ content: { contains: search, mode: "insensitive" } }, ...(mood ? [{ mood }] : [])],
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { [sortBy[0].toString()]: sortBy[1].toString() },
  });

  const total = await prisma.quote.count({
    where: {
      status: "APPROVED",
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
    sameSite: "lax",
    ...(isDev ? { maxAge: 60 * 60 } : { expires: getNextDay() }),
    secure: process.env.NODE_ENV === "production",
  });
};

export const requestQuote = async (payload: RequestQuoteSchema, c: Context) => {
  const { NODE_ENV } = env(c);
  const quote = await prisma.quote.create({
    data: { ...payload, canShow: false, isActive: false, status: "REQUESTED" },
  });

  setCookie(c, "requestId", quote.id.toString(), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: NODE_ENV === "production",
    ...(NODE_ENV === "development" ? { maxAge: 60 * 60 } : { expires: getNextDay() }),
  });
};

export const checkPasskey = async (passKey: string, c: Context) => {
  const { PASSKEY_URL, NODE_ENV } = env(c);
  const isDev = NODE_ENV === "development";

  const { passkey } = await getPasskey(PASSKEY_URL);

  if (passkey.key !== passKey) {
    throw new HTTPException(401, { message: "Invalid passkey, please enter valid passkey" });
  }

  setCookie(c, "passkey", passkey.key, {
    path: "/",
    ...(isDev ? { maxAge: 60 * 60 } : { expires: getNextDay() }),
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return passkey;
};

export const getRequestQuotes = async () => {
  const quotes = await prisma.quote.findMany({ where: { status: "REQUESTED" } });

  if (!quotes) throw new HTTPException(404, { message: "Not Found" });
  return quotes;
};

export const updateRequestQuote = async (payload: UpdateRequestQuoteSchema) => {
  const quote = await prisma.quote.findUnique({ where: { id: payload.id, status: "REQUESTED" } });
  if (!quote) throw new HTTPException(404, { message: "Not Found" });

  await prisma.quote.update({
    where: { id: payload.id },
    data: {
      content: payload.content,
      mood: payload.mood,
      author: payload.author,
    },
  });
};

export const acceptRequestQuote = async (id: string) => {
  const quote = await prisma.quote.findUnique({ where: { id, status: "REQUESTED" } });
  if (!quote) throw new HTTPException(404, { message: "Not Found" });

  await prisma.quote.update({
    where: { id: quote.id },
    data: { canShow: true, isActive: true, status: "APPROVED" },
  });
};

export const deleteRequestQuote = async (id: string) => {
  const quote = await prisma.quote.findUnique({ where: { id, status: "REQUESTED" } });
  if (!quote) throw new HTTPException(404, { message: "Not Found" });

  return await prisma.quote.delete({ where: { id, status: "REQUESTED" } });
};
