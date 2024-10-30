import MaxWidthWrapper from "./MaxWidthWrapper";

export default function Header() {
  return (
    <nav className="">
      <MaxWidthWrapper className="bg-white">
        <h1 className="text-xl font-semibold">Quote.</h1>
      </MaxWidthWrapper>
    </nav>
  );
}
