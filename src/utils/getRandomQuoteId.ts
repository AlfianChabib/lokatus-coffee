import prisma from "@/lib/prisma";
import { Mood } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export const getRandomQuoteId = async (mood: Mood) => {
  const quotesId = await prisma.quote.findMany({
    where: { mood, isActive: true, canShow: true, status: "APPROVED" },
    select: { id: true },
  });

  if (!quotesId.length) throw new HTTPException(404, { message: "No quote found" });

  const randomNumber = Math.floor(Math.random() * quotesId.length);
  const quoteId = quotesId[randomNumber].id;

  return quoteId;
};

export const getRandomBackgroundId = async () => {
  const backgrounds = await prisma.background.findMany({ select: { id: true } });

  if (!backgrounds.length) throw new HTTPException(404, { message: "No background found" });

  const randomNumber = Math.floor(Math.random() * backgrounds.length);
  const backgroundId = backgrounds[randomNumber].id;

  return backgroundId;
};
