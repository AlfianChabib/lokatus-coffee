import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminResponse } from "@/types/admin";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import DeleteAdmin from "../actions/delete-admin";
import UpdateAdmin from "../actions/edit-admin";

export const adminColumns: ColumnDef<AdminResponse>[] = [
  {
    accessorKey: "Username",
    cell: ({ row }) => {
      return <span className="text-nowrap">{row.original.username}</span>;
    },
  },
  {
    accessorKey: "Role",
    cell: ({ row }) => {
      return <span className="text-nowrap">{row.original.role}</span>;
    },
  },
  {
    accessorKey: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return <span className="text-nowrap">{formatDate(date)}</span>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <UpdateAdmin
              id={row.original.id}
              username={row.original.username}
              role={row.original.role}
            />
            <DeleteAdmin id={row.original.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
