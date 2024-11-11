import prisma from "@/lib/prisma";
import { Hono } from "hono";
import { getQuoteSchema, getQuotesSchema, postQuoteSchema } from "@/validation/quote.validation";
import { zValidator } from "@hono/zod-validator";
import { getMeta, getQuote, getQuotes } from "@/services/server/quote.service";
import { errorHandler } from "@/common/server/error-handler";
import { authenticate, bearerToken } from "@/middleware/auth-middleware";

const quotes = new Hono()
  .get("/", zValidator("query", getQuotesSchema), bearerToken, authenticate, async (c) => {
    try {
      const query = c.req.valid("query");

      console.log(query);

      const { quotes, total } = await getQuotes(query);
      const meta = getMeta(total, query.page, query.limit);

      return c.json({ message: "Get quotes successfully", meta: meta, data: quotes }, 200);
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .get("/:mood/:passKey", zValidator("param", getQuoteSchema), async (c) => {
    try {
      const { mood } = c.req.valid("param");
      const quote = await getQuote(mood, c);

      return c.json({ message: "Get quote successfully", data: quote }, 200);
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

      return c.json({ message: "Quote created", data: quote }, 201);
    } catch (error) {
      throw errorHandler(error);
    }
  });

export type QuotesType = typeof quotes;
export default quotes;
