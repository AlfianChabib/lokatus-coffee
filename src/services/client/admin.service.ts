import { AdminType } from "@/app/api/[[...route]]/admin";
import { CreateAdminSchema, UpdateAdminSchema } from "@/validation/admin.validation";
import { hc } from "hono/client";

export const adminClient = hc<AdminType>(`${process.env.NEXT_PUBLIC_APP_URL!}/api/admin`, {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getPasskey = async () => {
  const response = await adminClient.passkey.$get();

  const data = await response.json();
  if (!response.ok) return Promise.reject(data);

  return data.data;
};

export const getAdmin = async () => {
  const response = await adminClient.index.$get();

  const data = await response.json();
  if (!response.ok) return Promise.reject(data);

  return data.data;
};

export const createAdmin = async (payload: CreateAdminSchema) => {
  const response = await adminClient.index.$post({
    json: payload,
  });

  const data = await response.json();
  if (!response.ok) return Promise.reject(data);

  return data;
};

export const deleteAdmin = async (id: string) => {
  const response = await adminClient[":id"].$delete({
    param: { id },
  });

  const data = await response.json();
  if (!response.ok) return Promise.reject(data);

  return data;
};

export const updateAdmin = async (payload: UpdateAdminSchema) => {
  const response = await adminClient[":id"].$patch({
    param: { id: payload.id },
    json: payload,
  });

  const data = await response.json();
  if (!response.ok) return Promise.reject(data);

  return data;
};
