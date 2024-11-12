"use client";

import { useQuotes } from "@/hooks/admin/useQuotes";
import { QuotesTable } from "./table/QuotesTable";
import { quoteColumns } from "./table/columns";
import Loading from "../loading";

export default function QuotesList() {
  const { data: quotes, isLoading } = useQuotes();

  if (isLoading || !quotes) return <Loading />;

  return <QuotesTable data={quotes.data} columns={quoteColumns} isLoading={isLoading} />;
}
