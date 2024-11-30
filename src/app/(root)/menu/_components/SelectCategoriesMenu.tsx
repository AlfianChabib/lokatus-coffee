"use client";

import { Button } from "@/components/ui/button";
import { selectMenuParser } from "@/lib/nuqs-searchParams";
import { cn } from "@/lib/utils";
import { MENU } from "@/utils/constants";
import { useQueryStates } from "nuqs";

export default function SelectCategoriesMenu() {
  const [{ menu }, setSelectMenu] = useQueryStates(selectMenuParser);

  return (
    <div className="flex space-x-1 md:space-x-2">
      {MENU.map((item) => (
        <Button
          key={item.value}
          variant={menu === item.value ? "default" : "outline"}
          className={cn(
            "h-6 bg-transparent px-4",
            menu === item.value && "bg-blue-950 hover:bg-blue-950/80",
          )}
          size={"sm"}
          onClick={() =>
            setSelectMenu({
              menu: item.value,
            })
          }
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}
