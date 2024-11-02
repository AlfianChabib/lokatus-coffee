import Header from "@/components/base/Header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Header />
      {children}
    </div>
  );
}
