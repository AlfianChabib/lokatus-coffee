import prisma from "@/lib/prisma";
import { File } from "buffer";
import { writeFile } from "fs/promises";
import { HTTPException } from "hono/http-exception";
import path from "path";
import fs from "node:fs/promises";
import { v2 as cloudinary } from "cloudinary";
import { getBase64Encoder } from "@/utils/getBase64Encoder";

export const postBackgroundToStorage1 = async (image: File) => {
  const totalBackgrounds = await prisma.background.count();
  if (totalBackgrounds >= 5) throw new HTTPException(400, { message: "Max backgrounds reached" });

  const buffer = Buffer.from(await image.arrayBuffer());
  const filename = Date.now() + image.name.replaceAll(" ", "_");

  await writeFile(path.join(process.cwd(), "public/backgrounds/" + filename), buffer);

  const background = await prisma.background.create({
    data: { contentUrl: "/backgrounds/" + filename, name: filename },
  });
  if (!background) throw new HTTPException(400, { message: "Background not created" });

  return { background };
};

export const postBackgroundToStorage = async (image: File) => {
  const totalBackgrounds = await prisma.background.count();
  if (totalBackgrounds >= 5) throw new HTTPException(400, { message: "Max backgrounds reached" });

  const stringResult = await getBase64Encoder(image);

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

export const updateBackgroundToStorage = async (id: string, image: File) => {
  const existingBackground = await prisma.background.findUnique({ where: { id } });
  if (!existingBackground) throw new HTTPException(400, { message: "Background not found" });

  const buffer = Buffer.from(await image.arrayBuffer());
  const filename = Date.now() + image.name.replaceAll(" ", "_");

  await writeFile(path.join(process.cwd(), "public/backgrounds/" + filename), buffer);

  const background = await prisma.background.update({
    where: { id },
    data: { contentUrl: "/backgrounds/" + filename, name: filename },
  });
  if (!background) throw new HTTPException(400, { message: "Background not created" });

  await fs.rm(path.join(process.cwd(), "public/backgrounds/" + existingBackground.name), {
    force: true,
  });

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

export const deleteBackgroundCloudinary = async (id: string) => {
  const existingBackground = await prisma.background.findUnique({ where: { id } });
  if (!existingBackground) throw new HTTPException(400, { message: "Background not found" });

  await cloudinary.api.delete_resources([existingBackground.name]);
  await prisma.background.delete({ where: { id } });
};

export const deleteBackground = async (id: string) => {
  const existingBackground = await prisma.background.findUnique({ where: { id } });
  if (!existingBackground) throw new HTTPException(400, { message: "Background not found" });

  await prisma.background.delete({ where: { id } });

  await fs.rm(path.join(process.cwd(), "public/backgrounds/" + existingBackground.name), {
    force: true,
  });
};
