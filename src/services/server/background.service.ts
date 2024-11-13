import prisma from "@/lib/prisma";
import { File } from "buffer";
import { writeFile } from "fs/promises";
import { HTTPException } from "hono/http-exception";
import path from "path";
import fs from "node:fs/promises";

export const postBackgroundToStorage = async (image: File) => {
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

export const deleteBackground = async (id: string) => {
  const existingBackground = await prisma.background.findUnique({ where: { id } });
  if (!existingBackground) throw new HTTPException(400, { message: "Background not found" });

  await prisma.background.delete({ where: { id } });

  await fs.rm(path.join(process.cwd(), "public/backgrounds/" + existingBackground.name), {
    force: true,
  });
};
