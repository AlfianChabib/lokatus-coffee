import prisma from "@/lib/prisma";
import { Mood } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export const getRandomQuoteId = async (mood: Mood) => {
  const quotesId = await prisma.quote.findMany({
    where: { mood, isActive: true, canShow: true },
    select: { id: true },
  });

  if (!quotesId.length)
    throw new HTTPException(404, { message: "No quote found" });

  const randomNumber = Math.floor(Math.random() * quotesId.length);
  const quoteId = quotesId[randomNumber].id;

  return quoteId;
};
