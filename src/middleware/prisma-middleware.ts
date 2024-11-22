import { Bindings, Variables } from "@/types/server";
import { PrismaClient } from "@prisma/client";
import { env } from "hono/adapter";
import { createFactory } from "hono/factory";

const factory = createFactory<{ Bindings: Bindings; Variables: Variables }>();

export const prismaMiddleware = factory.createMiddleware(async (c, next) => {
  const { DATABASE_URL } = env(c);

  const db = new PrismaClient({ datasources: { db: { url: DATABASE_URL } } });

  c.set("db", db);
  await next();
});
