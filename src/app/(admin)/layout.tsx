import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./_components/AdminSidebar";
import SessionProvider from "@/components/providers/SessionProvider";
import AdminHeader from "./_components/AdminHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SessionProvider>
        <AdminSidebar />
        <main className="flex h-dvh w-full flex-col">
          <AdminHeader />
          <div className="h-full overflow-y-auto p-2 md:p-4">{children}</div>
        </main>
      </SessionProvider>
    </SidebarProvider>
  );
}
