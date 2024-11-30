import { Asset, EntryFieldTypes, UnresolvedLink } from "contentful";
import { Document as RichTextDocument } from "@contentful/rich-text-types";

const Category = {
  Coffee: "Coffee",
  Drink: "Drink",
  Food: "Food",
} as const;

export type Category = keyof typeof Category;

export interface ICover {
  fields: {
    title: string;
    file: {
      fileName: string;
      contentType: string;
      details: {
        image: {
          width: number;
          height: number;
        };
        size: number;
      };
      url: string;
    };
    description: string;
  };
}

export type MenuEntrySkeleton = {
  fields: {
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.RichText;
    category: Category;
    image: EntryFieldTypes.AssetLink;
  };
  contentTypeId: string;
};

export type Menu = {
  title: string;
  description: RichTextDocument;
  category: Category;
  image: UnresolvedLink<"Asset"> | Asset<undefined, string>;
};
