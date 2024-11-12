"use client";

import { QuoteResponse } from "@/types/quote";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import { Check, Frown, Smile, X } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";
import RowActions from "./row-actions";

export const quoteColumns: ColumnDef<QuoteResponse>[] = [
  {
    accessorKey: "author",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Author" />,
    cell: ({ row }) => {
      return <span className="text-nowrap">{row.original.author}</span>;
    },
  },
  {
    accessorKey: "content",
    enableSorting: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Content" />,
    cell: ({ row }) => {
      return (
        <div className="min-w-xl h-6 w-full overflow-hidden">
          <span className="line-clamp-1 text-wrap break-words">{row.original.content}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    enableHiding: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return <span className="text-nowrap">{formatDate(date)}</span>;
    },
  },
  {
    accessorKey: "isActive",
    enableHiding: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => <DataTableColumnHeader column={column} title="Is Active" />,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          {row.original.isActive ? <Check size={20} color="green" /> : <X size={20} color="red" />}
        </div>
      );
    },
  },
  {
    accessorKey: "mood",
    enableHiding: false,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mood" />,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          {row.original.mood === "HAPPY" ? (
            <Smile size={20} color="green" />
          ) : (
            <Frown size={20} color="red" />
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row} />,
  },
];
