"use client";

import { Menu } from "@/types/contentful";
import MenuCard from "./MenuCard";
import { useEffect, useState } from "react";
import { useQueryStates } from "nuqs";
import { selectMenuParser } from "@/lib/nuqs-searchParams";

export default function MenuDisplay({ menuData }: { menuData: Menu[] }) {
  const [{ menu }] = useQueryStates(selectMenuParser);
  const [displayMenu, setDisplayMenu] = useState(menuData);

  useEffect(() => {
    const filteredMenuData = menuData.filter((menuData) => {
      if (menu === "All") {
        return true;
      } else {
        return menuData.category === menu;
      }
    });
    setDisplayMenu(filteredMenuData);
  }, [menuData, menu]);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {displayMenu.map((data, index) => (
        <MenuCard key={index} menu={data} />
      ))}
    </div>
  );
}
