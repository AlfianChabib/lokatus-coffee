import { Role } from "@prisma/client";
import { z } from "zod";

export const createAdminSchema = z.object({
  username: z.string().min(3).max(20).trim(),
  password: z.string().min(8).max(20).trim(),
  role: z.literal(Role.ADMIN).or(z.literal(Role.SUPER_ADMIN)).or(z.string()),
});

export const deleteAdminSchema = z.object({
  id: z.string(),
});

export const updateAdminSchema = z.object({
  id: z.string(),
  username: z.string().min(3).max(20).trim(),
  password: z.optional(z.string().min(8).max(20)).or(z.string()),
  role: z.literal(Role.ADMIN).or(z.literal(Role.SUPER_ADMIN)).or(z.string()),
});

export type DeleteAdminSchema = z.infer<typeof deleteAdminSchema>;
export type UpdateAdminSchema = z.infer<typeof updateAdminSchema>;
export type CreateAdminSchema = z.infer<typeof createAdminSchema>;
