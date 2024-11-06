import { client } from "@/lib/hono-client";
import { LoginSchema } from "@/validation/auth.validation";

export const auth = client.api.auth;

export const login = async (payload: LoginSchema) => {
  const response = await auth.login.$post({
    json: payload,
  });
  return await response.json();
};
