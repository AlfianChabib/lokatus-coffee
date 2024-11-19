import dynamic from "next/dynamic";

const RequestQuoteForm = dynamic(() => import("./_components/request-quote-form"), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <RequestQuoteForm />
    </div>
  );
}
