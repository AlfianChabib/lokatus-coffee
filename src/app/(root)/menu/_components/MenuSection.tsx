import { getMenus } from "@/lib/contentful-client";
import SelectCategoriesMenu from "./SelectCategoriesMenu";
import MenuDisplay from "./MenuDisplay";

export default async function MenuSection() {
  const menus = await getMenus();
  const menuFields = menus.map((menu) => menu.fields);

  return (
    <section className="flex h-full w-full flex-col space-y-2 font-inter">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-blue-950 md:text-2xl">Our Menu</h2>
        <SelectCategoriesMenu />
      </div>
      <MenuDisplay menuData={menuFields} />
    </section>
  );
}
