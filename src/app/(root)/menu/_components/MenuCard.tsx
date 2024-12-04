import { ContentfulImage } from "@/components/ContentfulImage";
import { Badge } from "@/components/ui/badge";
import { Menu } from "@/types/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function MenuCard({ menu }: { menu: Menu }) {
  return (
    <div className="relative flex h-full max-h-96 flex-col overflow-hidden rounded-lg bg-blue-50/50 shadow-sm ring-1 ring-blue-500/30 transition-all hover:shadow-lg">
      <div className="aspect-square w-full">
        <ContentfulImage image={menu.image} />
      </div>
      <div className="flex flex-col space-y-2 p-2 leading-6">
        <h3 className="text-base font-semibold text-blue-950 md:text-lg">{menu.title}</h3>
        <span className="text-xs leading-4 text-blue-950/80 md:text-base md:leading-5">
          {documentToReactComponents(menu.description)}
        </span>
        <Badge className="w-max rounded-md bg-blue-700/20 font-montserrat text-blue-800/90 hover:bg-blue-800/90 hover:text-background">
          {menu.category}
        </Badge>
      </div>
      <Badge className="absolute right-1 top-1 w-max rounded-md bg-blue-50 font-montserrat text-foreground mix-blend-lighten hover:bg-blue-50/90 hover:text-foreground">
        {menu.category}
      </Badge>
    </div>
  );
}
