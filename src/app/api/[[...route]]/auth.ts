import { Hono } from "hono";
import { login } from "@/services/server/auth.service";
import { loginSchema } from "@/validation/auth.validation";
import { zValidator } from "@hono/zod-validator";
import { deleteCookie } from "hono/cookie";
import { errorHandler } from "@/common/server/error-handler";

const auth = new Hono()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    try {
      const { username, password } = c.req.valid("json");

      const loginResponse = await login({ username, password }, c);

      return c.json(
        { success: true, message: "Login successful", token: loginResponse.token },
        200,
      );
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .post("/logout", async (c) => {
    try {
      deleteCookie(c, "token");

      return c.json({ message: "Logout successful" }, 200);
    } catch (error) {
      throw errorHandler(error);
    }
  });

export default auth;
