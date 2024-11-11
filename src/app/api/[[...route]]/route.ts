import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { csrf } from "hono/csrf";
import auth from "./auth";
import quotes from "./quotes";
import admin from "./admin";
import { HTTPException } from "hono/http-exception";
import { Bindings, Variables } from "@/types/server";
import { JwtVariables } from "hono/jwt";

const app = new Hono<{ Bindings: Bindings; Variables: Variables & JwtVariables }>().basePath(
  "/api",
);

app.use("*", cors({ origin: process.env.NEXT_PUBLIC_APP_URL! }));
app.use("*", csrf({ origin: process.env.NEXT_PUBLIC_APP_URL! }));
app.use("*", secureHeaders({ xFrameOptions: false, xXssProtection: false }));
app.use(logger());
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));
app.onError((err, c) => {
  console.error(err.message);
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ success: false, message: "Internal Server Error" }, 500);
});

// app.use(
//   "/api/admin/*",
//   bearerAuth({
//     headerName: "Authorization",
//     verifyToken: async (token) => {
//       if (!token) return false;
//       return true;
//     },
//   }),
//   authenticate,
// );

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routers = app.route("/auth", auth).route("/quotes", quotes).route("/admin", admin);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routers;
