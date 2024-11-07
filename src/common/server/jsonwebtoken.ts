import { Role } from "@prisma/client";
import { JwtPayload, sign, verify } from "jsonwebtoken";

export const signToken = (payload: { username: string; role: Role }, secret: string) => {
  return sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string, secret: string) => {
  return verify(token, secret, { algorithms: ["HS256"] }) as {
    username: string;
    role: Role;
  } & JwtPayload;
};
