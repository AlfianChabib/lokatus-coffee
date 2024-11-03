import { cn } from "@/lib/utils";

export default function MaxWidthWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("flex w-full max-w-screen-sm", className)}>
      {children}
    </main>
  );
}
