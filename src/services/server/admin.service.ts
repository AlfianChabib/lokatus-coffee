import { hashPassword } from "@/common/server/password";
import prisma from "@/lib/prisma";
import { Passkey } from "@/types/server";
import { CreateAdminSchema, UpdateAdminSchema } from "@/validation/admin.validation";
import { Role } from "@prisma/client";
import { HTTPException } from "hono/http-exception";

export const getPasskey = async (passkeyUrl: string) => {
  const passkey = await fetch(passkeyUrl);
  const data = (await passkey.json()) as { passkey: Passkey };

  return { passkey: data.passkey };
};

export const getAdmin = async () => {
  const admin = await prisma.user.findMany();
  if (admin.length === 0) {
    throw new HTTPException(404, { message: "No admins found" });
  }
  return admin;
};

export const createAdmin = async (body: CreateAdminSchema) => {
  const hashedPassword = hashPassword(body.password);
  const existAdmin = await prisma.user.findUnique({ where: { username: body.username } });
  if (existAdmin)
    throw new HTTPException(400, {
      message: `Admin ${body.username} already exist, please try again`,
    });

  const admin = await prisma.user.create({
    data: { username: body.username, password: hashedPassword, role: body.role as Role },
  });

  if (!admin) throw new HTTPException(404, { message: "Admin not created" });

  return;
};

export const deleteAdmin = async (id: string) => {
  const existAdmin = await prisma.user.findUnique({ where: { id } });
  if (!existAdmin)
    throw new HTTPException(400, { message: `Admin ${id} not found, please try again` });

  return await prisma.user.delete({ where: { id } });
};

export const updateAdmin = async (payload: UpdateAdminSchema) => {
  const existAdmin = await prisma.user.findUnique({ where: { id: payload.id } });
  if (!existAdmin)
    throw new HTTPException(400, { message: `Admin ${payload.id} not found, please try again` });

  const hashedPassword = payload.password ? hashPassword(payload.password) : "";

  const updatedAdmin = await prisma.user.update({
    where: { id: existAdmin.id },
    data: {
      username: payload.username,
      password: payload.password ? hashedPassword : existAdmin.password,
      role: payload.role as Role,
    },
  });

  if (!updatedAdmin) throw new HTTPException(404, { message: "Admin not updated" });

  return;
};
