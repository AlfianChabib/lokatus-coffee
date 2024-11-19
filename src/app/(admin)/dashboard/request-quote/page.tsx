import { MessageSquareQuote } from "lucide-react";
import RequestQuoteList from "./_components/request-quote-list";

export default function RequestQuotePage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-gray-800">
        <div className="flex items-center justify-center gap-2 py-2">
          <MessageSquareQuote className="size-5" strokeWidth={2} />
          <h2 className="text-lg font-medium leading-none">Request Quotes</h2>
        </div>
      </div>
      <div className="min-h-96 rounded-lg border border-dashed border-gray-300 p-2">
        <RequestQuoteList />
      </div>
    </div>
  );
}
