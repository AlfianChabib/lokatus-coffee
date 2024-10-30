import { loginSchema } from "@/validation/auth.validation";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const auth = new Hono()
  .post("/admin/login", zValidator("json", loginSchema), async (c) => {
    return c.json({ message: "Login successful" });
  })
  .post("/admin/logout", async (c) => {
    return c.json({ message: "Logout successful" });
  });

export default auth;
