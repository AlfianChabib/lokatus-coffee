import { cn } from "@/lib/utils";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "flex h-12 w-full items-center justify-center border-t bg-background/50 p-3 text-foreground/70",
        className,
      )}
    >
      <p className="text-center text-sm text-foreground/80">Copyright © 2024 Lokatus Coffee</p>
    </footer>
  );
}
