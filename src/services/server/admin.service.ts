import { Passkey } from "@/types/server";

export const getPasskey = async (passkeyUrl: string) => {
  const passkey = await fetch(passkeyUrl);
  const data = (await passkey.json()) as { passkey: Passkey };

  return { passkey: data.passkey };
};
