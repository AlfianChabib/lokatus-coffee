import dynamic from "next/dynamic";

const PasskeyForm = dynamic(() => import("./_components/passkey-form"), {
  ssr: false,
});

export default function PasskeyPage() {
  return (
    <div className="w-full px-2">
      <PasskeyForm />
    </div>
  );
}
