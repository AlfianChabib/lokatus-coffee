import { getAdmin } from "@/services/client/admin.service";
import { useQuery } from "@tanstack/react-query";

export default function useGetAdmin() {
  return useQuery({
    queryKey: ["admin"],
    queryFn: getAdmin,
  });
}
