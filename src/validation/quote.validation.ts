import { Mood } from "@prisma/client";
import { z } from "zod";

const moods = ["HAPPY", "SAD"] as const;

export const getQuotesSchema = z.object({
  page: z.string().transform((page) => parseInt(page, 10)),
  limit: z.string().transform((limit) => parseInt(limit, 10)),
  mood: z.enum(moods).nullable().optional().catch("HAPPY"),
  search: z.string().optional().catch(""),
  sort: z.string().optional(),
});

export const getQuoteSchema = z.object({
  passKey: z.string().min(3, { message: "Passkey is too short" }),
  mood: z.literal(Mood.HAPPY).or(z.literal(Mood.SAD)),
});

export const postQuoteSchema = z.object({
  content: z.string().min(10, { message: "Content is too short" }),
  author: z.string().min(3, { message: "Author name is too short" }),
  mood: z.literal(Mood.HAPPY).or(z.literal(Mood.SAD)),
});

export type GetQuotesSchema = z.infer<typeof getQuotesSchema>;
export type GetQuoteSchema = z.infer<typeof getQuoteSchema>;
export type PostQuoteSchema = z.infer<typeof postQuoteSchema>;
