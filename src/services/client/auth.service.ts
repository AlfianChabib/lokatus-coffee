import { client } from "@/lib/hono-client";
import { LoginSchema } from "@/validation/auth.validation";

export const auth = client.api.auth;

export const login = async (payload: LoginSchema) => {
  const response = await auth.login.$post({ json: payload });

  return await response.json();
};

export const logout = async () => {
  const response = await auth.logout.$post();

  return await response.json();
};

export const getClientSession = async () => {
  const token = localStorage.getItem("token");
  const response = await auth.session.$get({
    header: { authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  return data.data;
};
