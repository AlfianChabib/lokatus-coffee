export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="grainy flex min-h-screen flex-col">{children}</div>;
}
