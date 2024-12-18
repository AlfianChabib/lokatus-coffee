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

export const deleteQuoteSchema = z.object({
  id: z.string(),
});

export const getQuoteSchema = z.object({
  mood: z.literal(Mood.HAPPY).or(z.literal(Mood.SAD)),
});

export const postMoodSchema = z.object({
  mood: z.literal(Mood.HAPPY).or(z.literal(Mood.SAD)),
});

export const checkPasskeySchema = z.object({
  passKey: z.string().min(11, { message: "Passkey is too short" }),
});

export const updateQuoteSchema = z.object({
  id: z.string(),
  content: z.string().min(10, { message: "Content is too short" }),
  author: z.string().min(3, { message: "Author name is too short" }),
  mood: z.literal(Mood.HAPPY).or(z.literal(Mood.SAD)),
});

export const updateQuoteStatusSchema = z.object({
  id: z.string(),
  isActive: z.boolean(),
});

export const createQuoteSchema = z.object({
  content: z.string().min(10, { message: "Content is too short" }),
  mood: z.literal(Mood.HAPPY).or(z.literal(Mood.SAD)),
});

export const requestQuoteSchema = z.object({
  content: z.string().min(10, { message: "Content is too short" }),
  mood: z.literal(Mood.HAPPY).or(z.literal(Mood.SAD)),
  author: z.string().min(3, { message: "Author name is too short" }),
});

export const updateRequestQuoteSchema = z.object({
  id: z.string(),
  content: z.string().min(10, { message: "Content is too short" }),
  mood: z.literal(Mood.HAPPY).or(z.literal(Mood.SAD)),
  author: z.string().min(3, { message: "Author name is too short" }),
});

export const acceptRequestQuoteSchema = z.object({ id: z.string() });

export const deleteRequestQuoteSchema = z.object({ id: z.string() });

export type DeleteRequestQuoteSchema = z.infer<typeof deleteRequestQuoteSchema>;
export type AcceptRequestQuoteSchema = z.infer<typeof acceptRequestQuoteSchema>;
export type UpdateRequestQuoteSchema = z.infer<typeof updateRequestQuoteSchema>;
export type RequestQuoteSchema = z.infer<typeof requestQuoteSchema>;
export type PostMoodSchema = z.infer<typeof postMoodSchema>;
export type CheckPasskeySchema = z.infer<typeof checkPasskeySchema>;
export type CreateQuoteSchema = z.infer<typeof createQuoteSchema>;
export type UpdateQuoteSchema = z.infer<typeof updateQuoteSchema>;
export type UpdateQuoteStatusSchema = z.infer<typeof updateQuoteStatusSchema>;
export type GetQuotesSchema = z.infer<typeof getQuotesSchema>;
export type GetQuoteSchema = z.infer<typeof getQuoteSchema>;
