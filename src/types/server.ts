import { User } from "@prisma/client";

export type Variables = {
  passkey: string;
  userId: string;
  user: Omit<User, "password" | "createdAt" | "updatedAt">;
};

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
