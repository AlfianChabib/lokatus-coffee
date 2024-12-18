import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-stretch bg-[url('/images/landing.png')] bg-cover bg-center font-bellefair">
      <div className="justify-betwee z-20 grid w-full flex-1">
        <div className="flex justify-center">
          <h1 className="pt-16 text-4xl font-semibold text-white">LOKATUS COFFEE</h1>
        </div>
        <div className="relative flex w-full items-center justify-center">
          <Image
            src={"/images/logo.png"}
            alt="logo"
            width={200}
            height={200}
            className="absolute z-20"
            priority
          />
          <span className="h-60 w-60 rounded-full bg-[#FFEAC5]/50 backdrop-blur-sm" />
          <span className="border-offset-8 absolute h-64 w-64 rounded-full border-4 border-[#FFEAC5]/50" />
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-center text-4xl text-white">
            Start your day
            <br />
            with Coffee
          </p>
          <span className="h-[1.5px] w-20 bg-white" />
          <div className="flex flex-col space-y-2 py-4">
            <Link
              href={"/menu"}
              className={buttonVariants({
                variant: "outline",
                className: "w-[200px] bg-[#F8F4E1] font-inter text-[#2c1f18]",
              })}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <p className="mb-4 text-center text-sm text-background/80">
        Copyright © 2024 Lokatus Coffee
      </p>
    </div>
  );
}
