import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const selectMenuParser = {
  menu: parseAsString.withDefault("All"),
};

export const selectMenuCache = createSearchParamsCache(selectMenuParser);
