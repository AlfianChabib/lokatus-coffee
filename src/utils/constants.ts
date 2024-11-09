import { AdminMenu } from "@/types/admin";
import { SessionData } from "@/types/auth";
import { addDays } from "date-fns";
import { BookUp, Images, MessageSquareQuote, Users } from "lucide-react";

export const getNextDay = () => {
  const nextDay = addDays(new Date().setHours(24, 0, 0, 0), 1);
  return nextDay;
};

export const initialSession = {
  username: "",
  id: "",
  role: "ADMIN",
} satisfies SessionData;

export const ADMIN_MENU = [
  { title: "Quotes", url: "/dashboard/quotes", icon: MessageSquareQuote, role: "ADMIN" },
  { title: "Background", url: "/dashboard/background", icon: Images, role: "ADMIN" },
  { title: "Request Quote", url: "/dashboard/request-quote", icon: BookUp, role: "ADMIN" },
  { title: "Admin", url: "/dashboard/admin", icon: Users, role: "SUPER_ADMIN" },
] satisfies AdminMenu[];
