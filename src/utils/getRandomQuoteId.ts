import prisma from "@/lib/prisma";
import { Mood } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export const getRandomQuoteId = async (mood: Mood) => {
  const quotesId = await prisma.quote.findMany({
    where: { mood, isActive: true, canShow: true, status: "APPROVED" },
    select: { id: true },
  });

  const totalQuotes = quotesId.length;
  console.log(process.env.NODE_ENV);

  if (totalQuotes === 0) throw new HTTPException(404, { message: "No quote found" });
  if (totalQuotes === 1) {
    await prisma.quote.updateMany({ data: { canShow: true } });
  }

  const randomNumber = Math.floor(Math.random() * quotesId.length);
  const quoteId = quotesId[randomNumber].id;

  await prisma.quote.update({
    where: { id: quoteId },
    data: { canShow: false },
  });

  return quoteId;
};

export const getRandomBackgroundId = async () => {
  const backgrounds = await prisma.background.findMany({ select: { id: true } });

  if (!backgrounds.length) throw new HTTPException(404, { message: "No background found" });

  const randomNumber = Math.floor(Math.random() * backgrounds.length);
  const backgroundId = backgrounds[randomNumber].id;

  return backgroundId;
};
