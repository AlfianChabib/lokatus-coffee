import { useSession } from "@/components/providers/SessionProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QuoteResponse } from "@/types/quote";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import UpdateQuote from "../actions/update-quote";
import UpdateIsActive from "../actions/update-isActive";

export default function RowActions({ row }: { row: Row<QuoteResponse> }) {
  const { role } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <UpdateQuote payload={row} />
        <UpdateIsActive status={row.original.isActive} />
        {role === "SUPER_ADMIN" ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log(row.original.id)}>
              Delete quote
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
