import { signToken } from "@/common/server/jsonwebtoken";
import { comparePassword } from "@/common/server/password";
import prisma from "@/lib/prisma";
import { LoginSchema } from "@/validation/auth.validation";
import { Context } from "hono";
import { setCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import { env } from "hono/adapter";

export const login = async (payload: LoginSchema, c: Context) => {
  const { TOKEN_JWT_SECRET } = env<{ TOKEN_JWT_SECRET: string }>(c);

  const user = await prisma.user.findFirst({ where: { username: payload.username } });
  if (!user) throw new HTTPException(400, { message: "Invalid username or password" });

  const isPasswordCorrect = comparePassword(payload.password, user.password);
  if (!isPasswordCorrect) throw new HTTPException(400, { message: "Invalid username or password" });

  const token = signToken({ username: user.username, role: user.role }, TOKEN_JWT_SECRET);
  setCookie(c, "token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return { token, userId: user.id };
};
