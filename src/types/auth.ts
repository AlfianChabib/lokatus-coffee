import { auth } from "@/services/client/auth.service";
import { InferResponseType } from "hono";

export type SessionData = InferResponseType<typeof auth.session.$get>["data"];
