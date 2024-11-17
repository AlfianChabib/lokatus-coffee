import dynamic from "next/dynamic";

const MoodForm = dynamic(() => import("./_components/mood-form"), {
  ssr: false,
});

export default function page() {
  return (
    <div className="w-full px-2">
      <MoodForm />
    </div>
  );
}
