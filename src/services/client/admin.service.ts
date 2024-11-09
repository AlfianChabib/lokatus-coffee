import { AdminType } from "@/app/api/[[...route]]/admin";
import { hc } from "hono/client";

export const adminClient = hc<AdminType>(`${process.env.NEXT_PUBLIC_APP_URL!}/api/admin`, {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const getPasskey = async () => {
  const response = await adminClient.passkey.$get();

  const data = await response.json();
  return data.data;
};
