import { Role } from "@prisma/client";
import { sign } from "jsonwebtoken";

export const signToken = (payload: { username: string; role: Role }, secret: string) => {
  return sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: "1d",
  });

  // const expiresIn = 60 * 60 * 24 * 30;
  // const options: JwtVariables = {
  //   jwtPayload: { ...payload, exp: Math.floor(Date.now() / 1000) + expiresIn },
  // };

  // return sign(options.jwtPayload, secret, "HS256");
};
