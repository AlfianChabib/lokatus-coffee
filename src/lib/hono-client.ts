import { hc } from "hono/client";
import type { AppType } from "@/app/api/[[...route]]/route";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);
export const login = client.api.auth.admin.login.$post({
  json: { username: "admin", password: "admin" },
});
