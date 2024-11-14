import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs";

const moods = ["HAPPY", "SAD"] as const;

export const useQuotesParams = () => {
  const [page, setPage] = useQueryState("page", parseAsString.withDefault("1"));
  const [limit, setLimit] = useQueryState("limit", parseAsString.withDefault("10"));
  const [search, setSearch] = useQueryState("search", parseAsString);
  const [mood, setMood] = useQueryState("mood", {
    defaultValue: undefined,
    parse: parseAsStringLiteral(moods).parse,
  });
  const [sort, setSort] = useQueryState("sort", { defaultValue: "createdAt_desc" });

  return {
    mood: mood as (typeof moods)[number] | undefined,
    search: search as string | undefined,
    page: page,
    limit: limit,
    sort,
    setPage,
    setLimit,
    setSearch,
    setMood,
    setSort,
  };
};
