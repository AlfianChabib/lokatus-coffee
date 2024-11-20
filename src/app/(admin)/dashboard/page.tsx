import { getSession } from "@/utils/getSession";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
  if (session) {
    redirect("/dashboard/quotes");
  } else redirect("/login");
}
