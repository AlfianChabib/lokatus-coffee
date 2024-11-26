import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { Suspense } from "react";

const QuoteResult = dynamic(() => import("@/app/(quote)/quote/_components/QuoteResult"), {
  ssr: false,
});

export default async function Page() {
  const vendor = headers().get("vendor");

  return (
    <div className="flex w-full px-2">
      <Suspense>
        <QuoteResult vendor={vendor} />
      </Suspense>
    </div>
  );
}
