import dynamic from "next/dynamic";

const QuoteResult = dynamic(() => import("@/app/(quote)/quote/_components/QuoteResult"), {
  ssr: false,
});

export default async function Page() {
  return (
    <div className="flex w-full px-2">
      <QuoteResult />
    </div>
  );
}
