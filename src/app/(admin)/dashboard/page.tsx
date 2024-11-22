"use client";

import { useSession } from "@/components/providers/SessionProvider";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const session = useSession();

  if (session && session.username) {
    router.push("/dashboard/quotes");
  } else {
    router.push("/login");
  }

  return;
}
