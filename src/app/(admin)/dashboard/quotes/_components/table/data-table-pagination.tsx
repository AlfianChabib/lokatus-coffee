import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuotes } from "@/hooks/quotes/useQuotes";
import { useQuotesParams } from "@/hooks/quotes/useQuotesParams";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const { data: quotes, isLoading } = useQuotes();
  const { setLimit, setPage } = useQuotesParams();

  if (isLoading || !quotes) {
    return (
      <div className="flex items-center justify-between px-2">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    );
  }

  const meta = quotes.meta;

  return (
    <div className="flex flex-col items-center justify-between gap-2 px-2 md:flex-row">
      <div className="flex-1 text-sm text-muted-foreground">{meta.totalData} total data</div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Page rows</p>
          <Select
            value={String(meta.limit)}
            onValueChange={(value) => {
              setLimit(value);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {meta.currentPage} of {meta.totalPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              setPage(String(meta.prevPage));
            }}
            disabled={!meta.canPrev}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              setPage(String(meta.nextPage));
            }}
            disabled={!meta.canNext}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
