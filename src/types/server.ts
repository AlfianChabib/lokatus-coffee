import { User } from "@prisma/client";
import { JwtVariables } from "hono/jwt";

export type Variables = {
  passkey: string;
  userId: string;
  user?: Omit<User, "password" | "createdAt" | "updatedAt">;
} & JwtVariables;

export type Bindings = {
  DATABASE_URL: string;
  PASSKEY_URL: string;
  TOKEN_JWT_SECRET: string;
  SESSION_ENCRYPTION_KEY: string;
};

export interface Passkey {
  createdAt: Date;
  id: number;
  key: string;
  updatedAt: Date;
}
