import { ACCEPTED_IMAGE_MIME_TYPES } from "@/utils/constants";
import { z } from "zod";

export const singleImageSchema = z
  .any()
  .refine((file: File) => file, { message: "File is required" })
  .refine((file: File) => file?.size <= 2 * 1024 * 1024, { message: "Max image size is 2MB." })
  .refine((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type), {
    message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
  });

export const postBackgroundSchema = z.object({
  image: singleImageSchema,
});
export const updateBackgroundSchema = z.object({
  image: singleImageSchema,
  id: z.string(),
});

export type UpdateBackgroundSchema = z.infer<typeof updateBackgroundSchema>;
export type PostBackgroundSchema = z.infer<typeof postBackgroundSchema>;
