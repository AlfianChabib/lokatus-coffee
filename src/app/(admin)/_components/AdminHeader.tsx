"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";

export default function AdminHeader() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <nav className="flex h-14 items-center justify-between border-b bg-white px-2 backdrop-blur-sm md:px-4">
      <div className="flex items-center space-x-2 md:space-x-2">
        <Button onClick={toggleSidebar} size={"icon"} variant={"outline"} className="size-7">
          <PanelLeft className={open ? "rotate-180" : ""} />
        </Button>
        <Separator orientation="vertical" className="py-3" />
      </div>
    </nav>
  );
}
