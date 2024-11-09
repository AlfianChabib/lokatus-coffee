import { getPasskey } from "@/services/client/admin.service";
import { useQuery } from "@tanstack/react-query";

export const usePasskey = () => {
  return useQuery({
    queryKey: ["passkey"],
    queryFn: getPasskey,
    refetchOnWindowFocus: false,
  });
};
