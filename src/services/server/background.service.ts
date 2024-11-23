import prisma from "@/lib/prisma";
import { File } from "buffer";
import { HTTPException } from "hono/http-exception";
import { v2 as cloudinary } from "cloudinary";
import { getBase64Encoder, getBase64Encoder2 } from "@/utils/getBase64Encoder";

export const postBackground = async (image: globalThis.File) => {
  const totalBackgrounds = await prisma.background.count();
  if (totalBackgrounds >= 5) throw new HTTPException(400, { message: "Max backgrounds reached" });

  const stringResult = await getBase64Encoder2(image);
  if (!stringResult) throw new HTTPException(400, { message: "Invalid file type" });

  const result = await cloudinary.uploader.upload(stringResult, {
    folder: "lokatus",
  });
  if (!result) throw new HTTPException(400, { message: "Uploading file failed" });

  const background = await prisma.background.create({
    data: { contentUrl: result.public_id, name: result.public_id },
  });
  if (!background) throw new HTTPException(400, { message: "Background not created" });

  return { background };
};

export const updateImageCloudinary = async (id: string, image: File) => {
  const existingBackground = await prisma.background.findUnique({ where: { id } });
  if (!existingBackground) throw new HTTPException(400, { message: "Background not found" });

  await cloudinary.api.delete_resources([existingBackground.name]);

  const stringResult = await getBase64Encoder(image);
  const result = await cloudinary.uploader.upload(stringResult, {
    folder: "lokatus",
  });
  if (!result) throw new HTTPException(400, { message: "Uploading file failed" });

  const background = await prisma.background.update({
    where: { id },
    data: { contentUrl: result.public_id, name: result.public_id },
  });
  if (!background) throw new HTTPException(400, { message: "Background not created" });

  return { background };
};

export const updateBackground = async (id: string, image: globalThis.File) => {
  const existingBackground = await prisma.background.findUnique({ where: { id } });
  if (!existingBackground) throw new HTTPException(400, { message: "Background not found" });

  await cloudinary.api.delete_resources([existingBackground.name]);

  const stringResult = await getBase64Encoder2(image);
  const result = await cloudinary.uploader.upload(stringResult, {
    folder: "lokatus",
  });
  if (!result) throw new HTTPException(400, { message: "Uploading file failed" });

  const background = await prisma.background.update({
    where: { id },
    data: { contentUrl: result.public_id, name: result.public_id },
  });
  if (!background) throw new HTTPException(400, { message: "Background not created" });

  return { background };
};

export const deleteBackground = async (id: string) => {
  const existingBackground = await prisma.background.findUnique({ where: { id } });
  if (!existingBackground) throw new HTTPException(400, { message: "Background not found" });

  await cloudinary.api.delete_resources([existingBackground.name]);
  await prisma.background.delete({ where: { id } });
};
