import { errorHandler } from "@/common/server/error-handler";
import { getPasskey } from "@/services/server/admin.service";
import { Bindings, Variables } from "@/types/server";
import { Hono } from "hono";
import { env } from "hono/adapter";

const admin = new Hono<{ Bindings: Bindings; Variables: Variables }>().get(
  "/passkey",
  async (c) => {
    try {
      const { PASSKEY_URL } = env(c);
      const user = c.get("user");

      const { passkey } = await getPasskey(PASSKEY_URL);

      return c.json({ message: "Passkey generated successfully", data: passkey.key, user });
    } catch (error) {
      throw errorHandler(error);
    }
  },
);

export default admin;
