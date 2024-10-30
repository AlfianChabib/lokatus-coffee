import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import auth from "./auth";
import quote from "./quote";

const app = new Hono().basePath("/api");

app.use("*", cors({ origin: "http://localhost:3000" }));
app.use(prettyJSON());
app.use(async (c, next) => {
  await next();

  if (c.error) {
    console.error(c.error);
    return c.json({ message: c.error.message }, 500);
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routers = app.route("/auth", auth).route("/quote", quote);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routers;
