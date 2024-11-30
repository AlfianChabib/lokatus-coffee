import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex aspect-[16/7] w-full items-center justify-between overflow-hidden rounded-xl bg-gradient-to-r from-yellow-100 to-amber-200 shadow-sm transition-all md:aspect-[16/6] md:shadow-md lg:aspect-[16/5]">
      <div className="flex h-full flex-1 flex-col justify-center gap-2 pl-4 font-montserrat md:pl-14">
        <h1 className="text-2xl font-bold uppercase leading-6 text-amber-900 text-foreground/90 sm:text-4xl md:text-5xl lg:text-6xl [&>span]:text-amber-500">
          Start <span>your</span>
          <br /> <span>day</span> with
          <br /> coffee
        </h1>
        <p className="max-w-72 text-xs font-medium leading-4 text-amber-800/80 md:max-w-72 md:text-base md:leading-5">
          The best grain, the finest roast, the most powerful flavour.
        </p>
        <div className="md:mt-2">
          <Link
            href={"/passkey"}
            className="flex h-8 w-40 items-center justify-center rounded-full bg-amber-900 px-4 py-2 text-sm font-medium text-amber-50 transition-all hover:bg-amber-800 hover:text-amber-200"
          >
            Get a quote
          </Link>
        </div>
      </div>
      <div className="flex aspect-square h-full items-center justify-end md:px-4 md:py-4">
        <Image
          src={"/images/main-coffee.png"}
          alt="main"
          width={300}
          height={300}
          priority
          className="w-full object-center"
        />
      </div>
    </section>
  );
}
