import { verifyToken } from "@/common/server/jsonwebtoken";
import prisma from "@/lib/prisma";
import { Bindings, Variables } from "@/types/server";
import { zValidator } from "@hono/zod-validator";
import { Role } from "@prisma/client";
import { env } from "hono/adapter";
import { bearerAuth } from "hono/bearer-auth";
import { createFactory } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

const factory = createFactory<{ Bindings: Bindings; Variables: Variables }>();

export const bearerToken = factory.createMiddleware(async (c, next) => {
  const authorization = bearerAuth({
    token: c.req.header("Authorization")?.split(" ")[1],
    headerName: "Authorization",
    verifyToken: async (token) => {
      if (!token) return false;
      return true;
    },
  });
  return authorization(c, next);
});

export const authenticate = factory.createMiddleware(async (c, next) => {
  const token = c.req.header("Authorization")?.split(" ")[1];

  if (!token) throw new HTTPException(401, { message: "Unauthorized" });

  const decoded = verifyToken(token, env(c).TOKEN_JWT_SECRET);
  if (!decoded) throw new HTTPException(401, { message: "Unauthorized" });

  const user = await prisma.user.findUnique({
    where: { username: decoded.username },
    select: { id: true, role: true, username: true },
  });
  if (!user) throw new HTTPException(401, { message: "Unauthorized" });
  c.set("user", user);

  await next();
});

export const authorize = (role: Role) =>
  factory.createMiddleware(async (c, next) => {
    const user = c.get("user");
    if (!user) throw new HTTPException(401, { message: "Unauthorized" });
    if (user.role !== role) throw new HTTPException(401, { message: "Unauthorized access" });

    await next();
  });

export const validateHeader = factory.createMiddleware(
  zValidator("header", z.object({ authorization: z.string() }), (result, c) => {
    c.res.headers.append("Authorization", result.data.authorization);
  }),
);
