import prisma from "@/utils/prisma";
import { quoteSchema } from "@/validation/quote";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const quote = new Hono()
  .get("/", async (c) => {
    return c.json({ message: "Hello World" });
  })
  .post("/", zValidator("json", quoteSchema), async (c) => {
    try {
      const { author, content } = c.req.valid("json");

      await prisma.quote.create({
        data: { author, content },
      });

      return c.json({ message: "Quote created successfully" }, 201);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Invalid request body" });
    }
  });

export default quote;
