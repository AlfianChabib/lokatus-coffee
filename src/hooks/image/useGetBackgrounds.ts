import { getBackgrounds } from "@/services/client/background.service";
import { useQuery } from "@tanstack/react-query";

export default function useGetBackgrounds() {
  return useQuery({
    queryKey: ["backgrounds"],
    queryFn: getBackgrounds,
  });
}
