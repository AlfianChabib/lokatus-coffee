import SessionProvider from "@/components/providers/SessionProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
}
