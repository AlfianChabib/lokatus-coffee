import { SearchParams } from "nuqs";
import HeroSection from "./_components/HeroSection";
import MenuSection from "./_components/MenuSection";
import { selectMenuCache } from "@/lib/nuqs-searchParams";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export const dynamic = "force-dynamic";

export default async function MenuPage({ searchParams }: PageProps) {
  await selectMenuCache.parse(searchParams);

  return (
    <div className="flex h-full min-h-screen w-full max-w-7xl flex-col items-center space-y-6 px-2 pb-10 pt-20 transition-all sm:px-4 lg:px-6">
      <HeroSection />
      <MenuSection />
    </div>
  );
}
