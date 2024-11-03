import prisma from "@/lib/prisma";
import { Hono } from "hono";
import { getQuoteSchema, postQuoteSchema } from "@/validation/quote.validation";
import { zValidator } from "@hono/zod-validator";
import { getQuote } from "@/services/server/quote.service";
import { errorHandler } from "@/common/server/error-handler";

const quote = new Hono()
  .get("/", zValidator("query", getQuoteSchema), async (c) => {
    try {
      const { mood } = c.req.valid("query");
      const quote = await getQuote(mood, c);

      return c.json({ message: "Hello World", data: quote }, 200);
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .post("/", zValidator("json", postQuoteSchema), async (c) => {
    try {
      const { author, content, mood } = c.req.valid("json");

      const quote = await prisma.quote.create({
        data: { author, content, mood },
      });

      return c.json({ message: "Quote created successfully", data: quote }, 201);
    } catch (error) {
      throw errorHandler(error);
    }
  });

export default quote;
