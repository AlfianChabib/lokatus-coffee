import dynamic from "next/dynamic";

const PasskeyForm = dynamic(() => import("./_components/passkey-form"), {
  ssr: false,
});

export default function PasskeyPage() {
  return (
    <div className="flex w-full px-2">
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
        <PasskeyForm />
      </div>
    </div>
  );
}
