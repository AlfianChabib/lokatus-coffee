import { MessageSquareQuote } from "lucide-react";
import QuotesList from "./_components/quotesList";

export default function QuotesPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-gray-800">
        <div className="flex items-center justify-center gap-2 py-2">
          <MessageSquareQuote className="size-5" strokeWidth={2} />
          <h2 className="text-lg font-medium leading-none">Quotes</h2>
        </div>
      </div>
      <div className="border-wrapper min-h-96">
        <QuotesList />
      </div>
    </div>
  );
}
