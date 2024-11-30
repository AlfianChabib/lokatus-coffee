import dynamic from "next/dynamic";

const MoodForm = dynamic(() => import("./_components/mood-form"), {
  ssr: false,
});

export default function page() {
  return (
    <div className="w-full px-2">
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
        <MoodForm />
      </div>
    </div>
  );
}
