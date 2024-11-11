import dynamic from "next/dynamic";

const QuoteResult = dynamic(() => import("@/components/quote/QuoteResult"), { ssr: false });

export default async function Page() {
  return (
    <div className="flex w-full px-2">
      <QuoteResult />
    </div>
  );
}
