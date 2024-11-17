"use client";

import Submit from "@/components/form-fields/Submit";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCheckPasskey from "@/hooks/quotes/useCheckPasskey";
import { CheckPasskeySchema, checkPasskeySchema } from "@/validation/quote.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function PasskeyForm() {
  const { mutate: checkPasskey, isPending } = useCheckPasskey();

  const form = useForm<CheckPasskeySchema>({
    resolver: zodResolver(checkPasskeySchema),
    defaultValues: { passKey: "" },
  });

  const handleSubmit = (data: CheckPasskeySchema) => {
    checkPasskey(data.passKey);
  };

  return (
    <div className="w-full space-y-8 rounded-lg border bg-white p-4 shadow-md">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold">Enter Passkey</h2>
        <p className="text-xs text-gray-600">Enter passkey from admin to get quote</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="passKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passkey</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Submit disabled={isPending}>Submit</Submit>
        </form>
      </Form>
    </div>
  );
}
