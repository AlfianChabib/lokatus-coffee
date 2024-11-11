import { errorHandler } from "@/common/server/error-handler";
import { authenticate, bearerToken } from "@/middleware/auth-middleware";
import { getPasskey } from "@/services/server/admin.service";
import { Bindings, Variables } from "@/types/server";
import { Hono } from "hono";
import { env } from "hono/adapter";

const admin = new Hono<{ Bindings: Bindings; Variables: Variables }>()
  .get("/passkey", bearerToken, authenticate, async (c) => {
    try {
      const { PASSKEY_URL } = env(c);

      const { passkey } = await getPasskey(PASSKEY_URL);

      return c.json({ message: "Passkey generated successfully", data: passkey.key });
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .get("/me", async (c) => {
    return c.json({ message: "Get me successfully", data: c.get("user") });
  });

export type AdminType = typeof admin;
export default admin;
