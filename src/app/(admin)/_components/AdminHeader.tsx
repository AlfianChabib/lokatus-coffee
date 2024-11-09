"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { usePasskey } from "@/hooks/admin/usePasskey";
import { KeySquare, PanelLeft } from "lucide-react";

export default function AdminHeader() {
  const { toggleSidebar, open } = useSidebar();
  const { data: passkey } = usePasskey();

  return (
    <nav className="flex h-14 items-center justify-between border-b bg-white px-2 backdrop-blur-sm md:px-4">
      <div className="flex items-center space-x-2 md:space-x-2">
        <Button onClick={toggleSidebar} size={"icon"} variant={"outline"} className="size-7">
          <PanelLeft className={open ? "rotate-180" : ""} />
        </Button>
        <Separator orientation="vertical" className="py-3" />
        <h2 className="font-medium text-gray-800">Lokatus Dashboard</h2>
      </div>
      <div>
        <Button variant={"secondary"} size={"sm"} className="items-center space-x-1 border py-0">
          <p className="text-base font-medium">{passkey}</p>
          <KeySquare />
        </Button>
      </div>
    </nav>
  );
}
