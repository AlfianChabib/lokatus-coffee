"use client";

import useGetAdmin from "@/hooks/admin/useGetAdmin";
import Loading from "../loading";
import { AdminTable } from "./table/admin-table";
import { adminColumns } from "./table/columns";

export default function AdminList() {
  const { data: admin, isLoading } = useGetAdmin();

  if (isLoading || !admin) return <Loading />;

  return <AdminTable columns={adminColumns} data={admin} isLoading={isLoading} />;
}
