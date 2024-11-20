import { adminClient } from "@/services/client/admin.service";
import { Role } from "@prisma/client";
import { InferResponseType } from "hono";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type AdminMenu = {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  role: Role;
};

export type AdminResponse = InferResponseType<typeof adminClient.index.$get>["data"][0];
