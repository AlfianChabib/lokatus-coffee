import { verifyToken } from "@/common/server/jsonwebtoken";
import prisma from "@/lib/prisma";
import { Bindings, Variables } from "@/types/server";
import { Role } from "@prisma/client";
import { env } from "hono/adapter";
import { getCookie } from "hono/cookie";
import { createFactory } from "hono/factory";
import { HTTPException } from "hono/http-exception";

const factory = createFactory<{ Bindings: Bindings; Variables: Variables }>();

export const authenticate = factory.createMiddleware(async (c, next) => {
  const token = getCookie(c, "token");
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
    if (user.role !== role) throw new HTTPException(401, { message: "Unauthorized" });

    await next();
  });
