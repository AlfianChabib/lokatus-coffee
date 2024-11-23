import { PrismaClient, User } from "@prisma/client";
import { JwtVariables } from "hono/jwt";

export type Variables = {
  db: PrismaClient;
  passkey: string;
  userId: string;
  user?: Omit<User, "password" | "createdAt" | "updatedAt">;
} & JwtVariables;

export type Bindings = {
  NODE_ENV: "development" | "production";
  DATABASE_URL: string;
  PASSKEY_URL: string;
  TOKEN_JWT_SECRET: string;
  SESSION_ENCRYPTION_KEY: string;
  NEXT_PUBLIC_CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
  QUOTE_JWT_SECRET: string;
};

export interface Passkey {
  createdAt: Date;
  id: number;
  key: string;
  updatedAt: Date;
}

export type QuoteTokenPayload = {
  quoteId: string;
  backgroundId: string;
};
