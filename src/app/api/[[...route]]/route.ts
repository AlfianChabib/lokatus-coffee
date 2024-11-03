import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import { secureHeaders } from "hono/secure-headers";
import { csrf } from "hono/csrf";
import auth from "./auth";
import quote from "./quote";
import { serveStatic } from "hono/serve-static";
import fs from "node:fs";
import { HTTPException } from "hono/http-exception";

const app = new Hono().basePath("/api");

app.use("*", cors({ origin: "http://localhost:3000" }));
app.use("*", csrf({ origin: "http://localhost:3000" }));
app.use("*", requestId());
app.use("*", secureHeaders({ xFrameOptions: false, xXssProtection: false }));
app.use(prettyJSON());
app.use(logger());
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ success: false, message: err.message }, err.status);
  }
  return c.json({ success: false, message: "Internal Server Error" }, 500);
});

app.use(
  "/static/*",
  serveStatic({
    root: process.cwd() + "/public",
    getContent: async (path) => {
      const filePath = path.replace("/api/static", "");
      const file = fs.readFileSync(filePath);
      return file;
    },
  }),
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routers = app.route("/auth", auth).route("/quote", quote);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routers;
