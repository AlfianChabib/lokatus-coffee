import { errorHandler } from "@/common/server/error-handler";
import { authenticate, authorize, bearerToken } from "@/middleware/auth-middleware";
import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getPasskey,
  updateAdmin,
} from "@/services/server/admin.service";
import { Bindings, Variables } from "@/types/server";
import {
  createAdminSchema,
  deleteAdminSchema,
  updateAdminSchema,
} from "@/validation/admin.validation";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { env } from "hono/adapter";

const admin = new Hono<{ Bindings: Bindings; Variables: Variables }>()
  .get("/passkey", bearerToken, authenticate, async (c) => {
    try {
      const { PASSKEY_URL } = env(c);

      const { passkey } = await getPasskey(PASSKEY_URL);

      return c.json({
        success: true,
        message: "Passkey generated successfully",
        data: passkey.key,
      });
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .get("/", bearerToken, authenticate, authorize("SUPER_ADMIN"), async (c) => {
    try {
      const admin = await getAdmin();

      return c.json({ success: true, message: "Get admin successfully", data: admin });
    } catch (error) {
      throw errorHandler(error);
    }
  })
  .post(
    "/",
    bearerToken,
    authenticate,
    authorize("SUPER_ADMIN"),
    zValidator("json", createAdminSchema),
    async (c) => {
      try {
        const body = c.req.valid("json");

        await createAdmin(body);

        return c.json({ success: true, message: "Create admin successfully" });
      } catch (error) {
        throw errorHandler(error);
      }
    },
  )
  .delete(
    "/:id",
    bearerToken,
    authenticate,
    authorize("SUPER_ADMIN"),
    zValidator("param", deleteAdminSchema),
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        await deleteAdmin(id);

        return c.json({ success: true, message: "Delete admin successfully" });
      } catch (error) {
        throw errorHandler(error);
      }
    },
  )
  .patch(
    "/:id",
    bearerToken,
    authenticate,
    authorize("SUPER_ADMIN"),
    zValidator("param", updateAdminSchema.pick({ id: true })),
    zValidator("json", updateAdminSchema.pick({ username: true, password: true, role: true })),
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        const body = c.req.valid("json");
        await updateAdmin({ id, ...body });

        return c.json({ success: true, message: "Update admin successfully" });
      } catch (error) {
        throw errorHandler(error);
      }
    },
  );

export type AdminType = typeof admin;
export default admin;
