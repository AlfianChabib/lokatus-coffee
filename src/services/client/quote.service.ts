import { client } from "@/lib/hono-client";

const quote = client.api.quote;

export async function getQuotes() {
  const response = await quote.$get({
    query: { mood: "HAPPY", passKey: "123456789" },
  });
  const data = await response.json();
  return data;
}
