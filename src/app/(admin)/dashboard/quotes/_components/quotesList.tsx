"use client";

import { useQuotes } from "@/hooks/admin/useQuotes";
import { QuotesTable } from "./table/QuotesTable";
import { quoteColumns } from "./table/columns";

export default function QuotesList() {
  const { data: quotes, isLoading } = useQuotes();

  if (isLoading || !quotes) {
    return <div>Loading...</div>;
  }

  return <QuotesTable data={quotes.data} columns={quoteColumns} isLoading={isLoading} />;
}
