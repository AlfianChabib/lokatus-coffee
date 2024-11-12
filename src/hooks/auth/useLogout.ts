"use client";

import { queryClient } from "@/lib/query-client";
import { auth, logout } from "@/services/client/auth.service";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogOut = () => {
  const router = useRouter();

  const mutation = useMutation<
    InferResponseType<typeof auth.logout.$post>,
    Error,
    InferRequestType<typeof auth.logout.$post>
  >({
    mutationFn: logout,
    onSuccess: (data) => {
      localStorage.removeItem("token");
      router.push("/login");
      queryClient.resetQueries();
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
