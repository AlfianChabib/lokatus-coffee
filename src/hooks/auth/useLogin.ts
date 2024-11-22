"use client";

import { queryClient } from "@/lib/query-client";
import { auth, login } from "@/services/client/auth.service";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();

  const mutation = useMutation<
    InferResponseType<typeof auth.login.$post>,
    Error,
    InferRequestType<typeof auth.login.$post>["json"]
  >({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["session"] });
      toast.success(data.message);
      router.push("/dashboard/quotes");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
