import { login } from "@/services/server/auth.service";
import { loginSchema } from "@/validation/auth.validation";
import { zValidator } from "@hono/zod-validator";
import { deleteCookie } from "hono/cookie";
import { errorHandler } from "@/common/server/error-handler";
import { Bindings, Variables } from "@/types/server";
import { Hono } from "hono";
import { authenticate } from "@/middleware/auth-middleware";
import { bearerAuth } from "hono/bearer-auth";

const auth = new Hono<{ Bindings: Bindings; Variables: Variables }>()
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
  .get(
    "/session",
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
        const user = c.get("user");

        return c.json({ success: true, message: "Session successful", data: user }, 200);
      } catch (error) {
        throw errorHandler(error);
      }
    },
  )
  .post("/logout", async (c) => {
    try {
      deleteCookie(c, "token");

      return c.json({ message: "Logout successful" }, 200);
    } catch (error) {
      throw errorHandler(error);
    }
  });

export default auth;
