import { z } from "zod";

export const quoteSchema = z.object({
  content: z.string().min(1),
  author: z.string().min(1),
});
