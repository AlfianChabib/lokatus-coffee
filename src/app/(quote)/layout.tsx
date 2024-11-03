import Header from "@/components/base/Header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center">
      <Header />
      {children}
    </div>
  );
}
