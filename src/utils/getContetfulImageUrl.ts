import { ICover } from "@/types/contentful";
import { Asset, UnresolvedLink } from "contentful";

export default function getContetfulImageUrl(
  asset: UnresolvedLink<"Asset"> | Asset<undefined, string> | ICover,
  // index: number,
) {
  // const image = menuFields[index].image as ICover;
  const assetData = asset as ICover;
  return `https:${assetData.fields.file.url}`;
}
