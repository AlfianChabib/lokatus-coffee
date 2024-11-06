import { auth, login } from "@/services/client/auth.service";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();

  const mutation = useMutation<
    InferResponseType<typeof auth.login.$post>,
    Error,
    InferRequestType<typeof auth.login.$post>["json"]
  >({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      router.push("/dashboard");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
};
