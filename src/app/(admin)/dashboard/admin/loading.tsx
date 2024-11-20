import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-gray-300 p-2">
      <LoaderCircle className="size-10 animate-spin text-gray-500" />
    </div>
  );
}
