import {
  deleteBackground,
  postBackground,
  updateBackground,
} from "@/services/server/background.service";
import { errorHandler } from "@/common/server/error-handler";
import { Bindings, Variables } from "@/types/server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { HTTPException } from "hono/http-exception";

const backgrounds = new Hono<{ Bindings: Bindings; Variables: Variables }>()
  .post("/", zValidator("form", z.object({ image: z.any() })), async (c) => {
    try {
      const { image } = c.req.valid("form");
      if (!image || typeof image !== "object") {
        throw new HTTPException(400, { message: "Invalid file type" });
      }

      const { background } = await postBackground(image);

      return c.json(
        { success: true, message: "Background uploaded successfully!", data: background },
        200,
      );
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .post("/test", async (c) => {
    try {
      const body = await c.req.formData();
      const image = body.get("image");

      if (!image || typeof image !== "object") {
        throw new HTTPException(400, { message: "Invalid file type" });
      }
      const { background } = await postBackground(image);

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
    zValidator("form", z.object({ image: z.any() })),
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        const { image } = c.req.valid("form");
        if (!image || typeof image !== "object") {
          throw new HTTPException(400, { message: "Invalid file type" });
        }

        const { background } = await updateBackground(id, image);

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
