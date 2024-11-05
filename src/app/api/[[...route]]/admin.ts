import { errorHandler } from "@/common/server/error-handler";
import { getPasskey } from "@/services/server/admin.service";
import { Bindings } from "@/types/server";
import { Hono } from "hono";
import { env } from "hono/adapter";

const admin = new Hono().get("/passkey", async (c) => {
  try {
    const { PASSKEY_URL } = env<Bindings>(c);

    const { passkey } = await getPasskey(PASSKEY_URL);

    return c.json({ message: "Passkey generated successfully", data: passkey.key });
  } catch (error) {
    throw errorHandler(error);
  }
});

export default admin;
