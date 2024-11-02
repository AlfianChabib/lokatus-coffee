import prisma from "@/lib/prisma";
import { getNextDay } from "@/utils/constants";
import { getRandomQuoteId } from "@/utils/getRandomQuoteId";
import { Mood } from "@prisma/client";
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
