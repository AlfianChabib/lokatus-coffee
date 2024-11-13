import {
  deleteBackground,
  postBackgroundToStorage,
  updateBackgroundToStorage,
} from "@/services/server/background.service";
import { errorHandler } from "@/common/server/error-handler";
import { Bindings, Variables } from "@/types/server";
import { zValidator } from "@hono/zod-validator";
import { File } from "buffer";
import { Hono } from "hono";
import { z } from "zod";
import prisma from "@/lib/prisma";

const backgrounds = new Hono<{ Bindings: Bindings; Variables: Variables }>()
  .post("/", zValidator("form", z.object({ image: z.instanceof(File) })), async (c) => {
    try {
      const { image } = c.req.valid("form");

      const { background } = await postBackgroundToStorage(image);

      return c.json(
        { success: true, message: "Background uploaded successfully!", data: background },
        200,
      );
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .get("/", async (c) => {
    try {
      const backgrounds = await prisma.background.findMany({
        orderBy: { id: "desc" },
      });

      return c.json(
        { success: true, message: "Backgrounds retrieved successfully!", data: backgrounds },
        200,
      );
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("form", z.object({ image: z.instanceof(File) })),
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        const { image } = c.req.valid("form");

        const { background } = await updateBackgroundToStorage(id, image);

        return c.json(
          { success: true, message: "Background updated successfully!", data: background },
          200,
        );
      } catch (error) {
        throw errorHandler(error);
      }
    },
  )
  .delete("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    try {
      const { id } = c.req.valid("param");

      await deleteBackground(id);

      return c.json({ success: true, message: "Background deleted successfully!" }, 200);
    } catch (error) {
      throw errorHandler(error);
    }
  });

export type BackgroundsType = typeof backgrounds;
export default backgrounds;
