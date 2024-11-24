import prisma from "@/lib/prisma";
import { Hono } from "hono";
import { Bindings, Variables } from "@/types/server";
import {
  acceptRequestQuoteSchema,
  checkPasskeySchema,
  createQuoteSchema,
  deleteQuoteSchema,
  deleteRequestQuoteSchema,
  getQuotesSchema,
  postMoodSchema,
  requestQuoteSchema,
  updateQuoteSchema,
  updateQuoteStatusSchema,
  updateRequestQuoteSchema,
} from "@/validation/quote.validation";
import { zValidator } from "@hono/zod-validator";
import {
  acceptRequestQuote,
  checkPasskey,
  deleteRequestQuote,
  getMeta,
  getQuote,
  getQuotes,
  getRequestQuotes,
  postMood,
  requestQuote,
  updateRequestQuote,
  updateStatusQuote,
  verifyRequestQuote,
} from "@/services/server/quote.service";
import { errorHandler } from "@/common/server/error-handler";
import { authenticate, authorize, bearerToken } from "@/middleware/auth-middleware";
import { HTTPException } from "hono/http-exception";
import { env } from "hono/adapter";
import { deleteCookie, getCookie } from "hono/cookie";
import { verifyQuoteToken } from "@/common/server/jsonwebtoken";

const quotes = new Hono<{ Bindings: Bindings; Variables: Variables }>()
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

        const quote = await updateStatusQuote({ id, isActive: payload.isActive });

        return c.json({ message: "Update quote status successfully", data: quote }, 200);
      } catch (error) {
        throw errorHandler(error);
      }
    },
  )
  .post("/", bearerToken, authenticate, zValidator("json", createQuoteSchema), async (c) => {
    try {
      const { content, mood } = c.req.valid("json");

      const quote = await prisma.quote.create({
        data: { author: "Lokatus Coffee", content, mood, status: "APPROVED", canShow: true },
      });

      return c.json({ message: "Get quote successfully", data: quote }, 200);
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .get("/request", bearerToken, authenticate, async (c) => {
    try {
      const quotes = await getRequestQuotes();

      return c.json({ message: "Get request quotes successfully", data: quotes }, 200);
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .post("/request", zValidator("json", requestQuoteSchema), async (c) => {
    try {
      const payload = c.req.valid("json");
      const quoteCookie = getCookie(c, "quote");
      const { QUOTE_JWT_SECRET } = env(c);
      if (!quoteCookie) throw new HTTPException(401, { message: "Unauthorized" });
      const quotePayload = verifyQuoteToken(quoteCookie, QUOTE_JWT_SECRET);
      if (!quotePayload) {
        deleteCookie(c, "quote");
        throw new HTTPException(401, { message: "Unauthorized" });
      }

      if (!quoteCookie) throw new HTTPException(401, { message: "Unauthorized" });

      await verifyRequestQuote(quotePayload.requestQuoteId);

      await requestQuote(payload, quotePayload.requestQuoteId, c);

      return c.json({ message: "Request quote successfully" }, 201);
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .patch(
    "/request/:id",
    zValidator("param", updateRequestQuoteSchema.pick({ id: true })),
    zValidator("json", updateRequestQuoteSchema.pick({ author: true, content: true, mood: true })),
    bearerToken,
    authenticate,
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        const payload = c.req.valid("json");

        await updateRequestQuote({ ...payload, id });

        return c.json({ message: "Update quote successfully" }, 200);
      } catch (error) {
        throw errorHandler(error);
      }
    },
  )
  .patch("/request/accept/:id", zValidator("param", acceptRequestQuoteSchema), async (c) => {
    try {
      const { id } = c.req.valid("param");

      await acceptRequestQuote(id);

      return c.json({ message: "Update quote successfully" }, 200);
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .delete("/request/:id", zValidator("param", deleteRequestQuoteSchema), async (c) => {
    try {
      const { id } = c.req.valid("param");

      await deleteRequestQuote(id);

      return c.json({ message: "Delete request quote successfully" }, 200);
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .post("/mood", zValidator("json", postMoodSchema), async (c) => {
    try {
      const { mood } = c.req.valid("json");
      const passkey = getCookie(c, "passkey");
      if (!passkey) throw new HTTPException(401, { message: "Unauthorized" });

      await postMood(mood, c);

      return c.json({ message: "Post mood successfully" }, 200);
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .get("/result", async (c) => {
    try {
      const { QUOTE_JWT_SECRET } = env(c);
      const quoteToken = getCookie(c, "quote");
      if (!quoteToken) throw new HTTPException(401, { message: "Unauthorized" });

      const quotePayload = verifyQuoteToken(quoteToken, QUOTE_JWT_SECRET);
      if (!quotePayload) {
        deleteCookie(c, "quote");
        deleteCookie(c, "passkey");
        throw new HTTPException(401, { message: "Unauthorized" });
      }

      const quoteResponse = await getQuote(quotePayload);

      return c.json({ message: "Get quote successfully", data: quoteResponse }, 200);
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .post("/passkey", zValidator("json", checkPasskeySchema), async (c) => {
    try {
      const { passKey } = c.req.valid("json");

      const passkey = await checkPasskey(passKey, c);

      return c.json({ success: true, message: "Passkey is valid", data: passkey }, 200);
    } catch (error) {
      throw errorHandler(error);
    }
  });

export type QuotesType = typeof quotes;
export default quotes;
