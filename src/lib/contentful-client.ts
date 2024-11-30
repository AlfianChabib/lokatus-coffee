import { MenuEntrySkeleton } from "@/types/contentful";
import { createClient } from "contentful";

export const contenfulClient = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  space: process.env.CONTENTFUL_SPACE_ID!,
});

export const getMenus = async () => {
  const response = await contenfulClient.getEntries<MenuEntrySkeleton>({
    content_type: process.env.CONTENTFUL_CONTENT_TYPE_ID!,
    "fields.image[exists]": true,
  });

  return response.items;
};
