import { cn } from "@/lib/utils";

export default function MaxWidthWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <main className={cn("max-w-screen-xl px-2 md:px-4", className)}>{children}</main>;
}
