import { Mood } from "@prisma/client";
import { z } from "zod";

export const getQuoteSchema = z.object({
  passKey: z.string().min(3, { message: "Passkey is too short" }),
  mood: z.literal(Mood.HAPPY).or(z.literal(Mood.SAD)),
});

export const postQuoteSchema = z.object({
  content: z.string().min(10, { message: "Content is too short" }),
  author: z.string().min(3, { message: "Author name is too short" }),
  mood: z.literal(Mood.HAPPY).or(z.literal(Mood.SAD)),
});

export type GetQuoteSchema = z.infer<typeof getQuoteSchema>;
export type PostQuoteSchema = z.infer<typeof postQuoteSchema>;
