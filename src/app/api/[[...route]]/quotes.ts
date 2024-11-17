import prisma from "@/lib/prisma";
import { Hono } from "hono";
import { Bindings, Variables } from "@/types/server";
import {
  checkPasskeySchema,
  createQuoteSchema,
  deleteQuoteSchema,
  getQuotesSchema,
  postMoodSchema,
  postQuoteSchema,
  updateQuoteSchema,
  updateQuoteStatusSchema,
} from "@/validation/quote.validation";
import { zValidator } from "@hono/zod-validator";
import { getMeta, getQuote, getQuotes, postMood } from "@/services/server/quote.service";
import { errorHandler } from "@/common/server/error-handler";
import { authenticate, authorize, bearerToken } from "@/middleware/auth-middleware";
import { HTTPException } from "hono/http-exception";
import { getPasskey } from "@/services/server/admin.service";
import { env } from "hono/adapter";
import { getCookie, setCookie } from "hono/cookie";
import { verifyQuoteToken } from "@/common/server/jsonwebtoken";
import { getNextDay } from "@/utils/constants";

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
  .post("/", bearerToken, authenticate, zValidator("json", createQuoteSchema), async (c) => {
    try {
      const { content, mood } = c.req.valid("json");

      const quote = await prisma.quote.create({
        data: { author: "Lokatus Coffee", content, mood, status: "APPROVED" },
      });

      return c.json({ message: "Get quote successfully", data: quote }, 200);
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .post("/request", zValidator("json", postQuoteSchema), async (c) => {
    try {
      const { author, content, mood } = c.req.valid("json");

      const quote = await prisma.quote.create({
        data: { author, content, mood },
      });

      return c.json({ message: "Quote created", data: quote }, 201);
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .post("/mood", zValidator("json", postMoodSchema), async (c) => {
    try {
      const { mood } = c.req.valid("json");

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
      if (!quotePayload) throw new HTTPException(401, { message: "Unauthorized" });

      const quoteResponse = await getQuote(quotePayload);

      return c.json({ message: "Get quote successfully", data: quoteResponse }, 200);
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .post("/passkey", zValidator("json", checkPasskeySchema), async (c) => {
    try {
      const { passKey } = c.req.valid("json");
      const { PASSKEY_URL, NODE_ENV } = env(c);
      const isDev = NODE_ENV === "development";

      console.log(isDev, "is dev");

      const { passkey } = await getPasskey(PASSKEY_URL);

      if (passkey.key !== passKey) {
        throw new HTTPException(401, { message: "Invalid passkey, please enter valid passkey" });
      }

      setCookie(c, "passkey", passkey.key, {
        path: "/",
        ...(isDev ? { maxAge: 60 } : { expires: getNextDay() }),
        sameSite: "Lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });

      return c.json({ success: true, message: "Passkey is valid", data: passkey }, 200);
    } catch (error) {
      throw errorHandler(error);
    }
  });

export type QuotesType = typeof quotes;
export default quotes;
