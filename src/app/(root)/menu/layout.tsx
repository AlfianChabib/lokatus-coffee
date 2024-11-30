import Footer from "@/components/base/Footer";
import MainHeader from "./_components/MainHeader";

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex h-full w-full flex-col items-center bg-cyan-50/50">
      <MainHeader />
      {children}
      <Footer />
    </main>
  );
}
