import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(8).max(20).trim(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
