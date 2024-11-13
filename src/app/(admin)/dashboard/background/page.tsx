import { Images } from "lucide-react";
import BackgroundList from "./_components/BackgroundList";
import { PostBackground } from "./_components/PostBackground";

export default function backgroundPage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-gray-800">
        <div className="flex items-center justify-center gap-2 py-2">
          <Images className="size-5" strokeWidth={2} />
          <h2 className="text-lg font-medium leading-none">Backgrounds</h2>
        </div>
        <PostBackground />
      </div>
      <div className="min-h-96 rounded-lg border border-dashed border-gray-300 p-2">
        <BackgroundList />
      </div>
    </div>
  );
}
