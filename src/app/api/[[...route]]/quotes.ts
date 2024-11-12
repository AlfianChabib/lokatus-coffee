import prisma from "@/lib/prisma";
import { Hono } from "hono";
import {
  deleteQuoteSchema,
  getQuoteSchema,
  getQuotesSchema,
  postQuoteSchema,
  updateQuoteSchema,
  updateQuoteStatusSchema,
} from "@/validation/quote.validation";
import { zValidator } from "@hono/zod-validator";
import { getMeta, getQuote, getQuotes } from "@/services/server/quote.service";
import { errorHandler } from "@/common/server/error-handler";
import { authenticate, authorize, bearerToken } from "@/middleware/auth-middleware";
import { HTTPException } from "hono/http-exception";

const quotes = new Hono()
  .get("/", zValidator("query", getQuotesSchema), bearerToken, authenticate, async (c) => {
    try {
      const query = c.req.valid("query");

      const { quotes, total } = await getQuotes(query);
      const meta = getMeta(total, query.page, query.limit);

      return c.json({ message: "Get quotes successfully", meta: meta, data: quotes }, 200);
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .delete(
    "/:id",
    zValidator("param", deleteQuoteSchema),
    bearerToken,
    authenticate,
    authorize("SUPER_ADMIN"),
    async (c) => {
      try {
        const { id } = c.req.valid("param");

        const quote = await prisma.quote.delete({ where: { id } });
        if (!quote) throw new HTTPException(404, { message: "Quote not found" });

        return c.json({ message: "Delete quote successfully", data: quote }, 200);
      } catch (error) {
        throw errorHandler(error);
      }
    },
  )
  .patch(
    "/:id",
    zValidator("param", updateQuoteSchema.pick({ id: true })),
    zValidator("json", updateQuoteSchema.pick({ author: true, content: true, mood: true })),
    bearerToken,
    authenticate,
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        const payload = c.req.valid("json");

        const quote = await prisma.quote.update({ where: { id }, data: payload });
        if (!quote) throw new HTTPException(404, { message: "Quote not found" });

        return c.json({ message: "Update quote successfully", data: quote }, 200);
      } catch (error) {
        throw errorHandler(error);
      }
    },
  )
  .patch(
    "/status/:id",
    zValidator("param", updateQuoteStatusSchema.pick({ id: true })),
    zValidator("json", updateQuoteStatusSchema.pick({ isActive: true })),
    bearerToken,
    authenticate,
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        const payload = c.req.valid("json");

        const quote = await prisma.quote.update({
          where: { id },
          data: { isActive: payload.isActive },
        });
        if (!quote) throw new HTTPException(404, { message: "Quote not found" });

        return c.json({ message: "Update quote status successfully", data: quote }, 200);
      } catch (error) {
        throw errorHandler(error);
      }
    },
  )
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
