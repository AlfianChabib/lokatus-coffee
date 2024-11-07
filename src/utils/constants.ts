import { SessionData } from "@/types/auth";
import { addDays } from "date-fns";

export const getNextDay = () => {
  const nextDay = addDays(new Date().setHours(24, 0, 0, 0), 1);
  return nextDay;
};

export const initialSession = {
  username: "",
  id: "",
  role: "ADMIN",
} satisfies SessionData;
