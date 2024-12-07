import { Hono } from "hono";
import { handle } from "hono/vercel";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { csrf } from "hono/csrf";
import auth from "./auth";
import quotes from "./quotes";
import admin from "./admin";
import { HTTPException } from "hono/http-exception";
import { Bindings, Variables } from "@/types/server";
import { prettyJSON } from "hono/pretty-json";
import backgrounds from "./backgrounds";
import { v2 as cloudinary } from "cloudinary";
import { env } from "hono/adapter";
import { prismaMiddleware } from "@/middleware/prisma-middleware";

export const runtime = "nodejs";

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()
  .basePath("/api")
  .route("/auth", auth)
  .route("/quotes", quotes)
  .route("/admin", admin)
  .route("/backgrounds", backgrounds);

app.use("*", logger());
app.use("*", prettyJSON());
app.use("*", cors({ origin: process.env.NEXT_PUBLIC_APP_URL! }));
app.use("*", csrf({ origin: process.env.NEXT_PUBLIC_APP_URL! }));
app.use("*", secureHeaders({ xFrameOptions: true, xXssProtection: true }));
app.use(prismaMiddleware);
app.use(async (c, next) => {
  const {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
  } = env(c);

  cloudinary.config({
    cloud_name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  await next();
});

app.onError((err, c) => {
  console.error(err.message, c.req.url);
  if (err instanceof HTTPException) {
    return c.json({ success: false, message: err.message }, err.status);
  }
  return c.json({ success: false, message: "Internal Server Error" }, 500);
});

app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
