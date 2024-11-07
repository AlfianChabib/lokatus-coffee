"use client";

import { useSession } from "@/components/providers/SessionProvider";
// import { getSession } from "@/utils/getSession";

export default function Page() {
  const { username } = useSession();
  console.log(username);
  return <div>{username}</div>;
}
