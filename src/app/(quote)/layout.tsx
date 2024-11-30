import Footer from "@/components/base/Footer";
import Header from "@/components/base/Header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-screen flex-col items-center justify-center">
      <Header />
      <div className="w-full max-w-md">{children}</div>
      <Footer />
    </div>
  );
}
