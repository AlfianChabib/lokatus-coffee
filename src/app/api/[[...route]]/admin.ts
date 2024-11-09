import { errorHandler } from "@/common/server/error-handler";
import { authenticate } from "@/middleware/auth-middleware";
import { getPasskey } from "@/services/server/admin.service";
import { Bindings, Variables } from "@/types/server";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { bearerAuth } from "hono/bearer-auth";

const admin = new Hono<{ Bindings: Bindings; Variables: Variables }>().get(
  "/passkey",
  bearerAuth({
    headerName: "Authorization",
    verifyToken: async (token) => {
      if (!token) return false;
      return true;
    },
  }),
  authenticate,
  async (c) => {
    try {
      const { PASSKEY_URL } = env(c);
      console.log(c.header("Authorization"), "header passkey");

      const { passkey } = await getPasskey(PASSKEY_URL);

      return c.json({ message: "Passkey generated successfully", data: passkey.key });
    } catch (error) {
      throw errorHandler(error);
    }
  },
);

export type AdminType = typeof admin;

export default admin;
