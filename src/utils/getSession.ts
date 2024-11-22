import { auth } from "@/services/client/auth.service";
import { InferResponseType } from "hono";
import { cookies } from "next/headers";

export async function getSession() {
  const token = cookies().get("token")?.value;

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/session`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      cookie: `token=${token}`,
    },
    cache: "no-cache",
  });
  const data = (await response.json()) as InferResponseType<typeof auth.session.$get>;

  return data.data;
}
