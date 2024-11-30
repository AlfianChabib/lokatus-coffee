import dynamic from "next/dynamic";

const RequestQuoteForm = dynamic(() => import("./_components/request-quote-form"), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="w-full px-2">
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
        <RequestQuoteForm />
      </div>
    </div>
  );
}
