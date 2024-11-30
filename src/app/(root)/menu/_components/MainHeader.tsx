import QuoteMenu from "@/app/(quote)/_components/QuoteMenu";
import Image from "next/image";
import Link from "next/link";

export default function MainHeader() {
  return (
    <nav className="fixed top-0 z-50 flex w-full justify-center border-b border-slate-200 bg-background/50 shadow-sm backdrop-blur-md">
      <div className="flex w-full max-w-7xl items-center justify-between p-3">
        <Link href={"/"} className="flex items-center gap-2 font-montserrat">
          <Image src={"/images/logo-no-text.png"} alt="logo" width={40} height={40} />
          <div>
            <h1 className="text-xl font-semibold leading-5 text-blue-950">Lokatus Coffee.</h1>
            <p className="text-xs font-medium text-foreground/70">Start your day with coffee</p>
          </div>
        </Link>
        <div>
          <QuoteMenu />
        </div>
      </div>
    </nav>
  );
}
