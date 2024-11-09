"use client";

import { useSession } from "@/components/providers/SessionProvider";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLogOut } from "@/hooks/auth/useLogout";
import { ADMIN_MENU } from "@/utils/constants";
import { ChevronUp, GalleryVerticalEnd, LogOut } from "lucide-react";
import Link from "next/link";

export function AdminSidebar() {
  const session = useSession();
  const { mutate: logout, isPending } = useLogOut();
  const { toggleSidebar, isMobile } = useSidebar();

  const menuByRole = ADMIN_MENU.filter((item) =>
    item.role === session.role ? item : item.role === "ADMIN",
  );

  return (
    <Sidebar className="bg-gray-100 backdrop-blur-lg">
      <SidebarHeader>
        <Link
          href="/dashboard"
          className="flex items-center space-x-2 rounded-md border p-2 text-gray-800 hover:bg-zinc-100 hover:text-gray-950"
        >
          <GalleryVerticalEnd size={18} />
          <h1 className="font-medium">Lokatus Dashboard</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="flex flex-col space-y-1">
          {menuByRole.map((item) => (
            <SidebarMenuItem
              key={item.title}
              onClick={isMobile ? toggleSidebar : undefined}
              className="list-none"
            >
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className={buttonVariants({ variant: "secondary", className: "capitalize" })}
                >
                  {session.username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuLabel className="capitalize">{session.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={isPending}
                  onClick={logout}
                  className="cursor-pointer !bg-red-500 !text-white hover:!bg-red-600 hover:!text-gray-100"
                >
                  <p>Logout</p>
                  <LogOut className="ml-auto" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
