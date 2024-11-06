import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";
import { Loader2Icon } from "lucide-react";

export default function Submit({ children, ...props }: { children: ReactNode } & ButtonProps) {
  return (
    <Button type="submit" {...props} className={cn("flex justify-center gap-2", props.className)}>
      {props.disabled && <Loader2Icon className="h-4 w-4 animate-spin" />} {children}
    </Button>
  );
}
