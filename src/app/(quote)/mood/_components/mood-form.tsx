"use client";

import Submit from "@/components/form-fields/Submit";
import HappyIcon from "@/components/svgs/happy";
import SadIcon from "@/components/svgs/sad";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import usePostMood from "@/hooks/quotes/usePostMood";
import { cn } from "@/lib/utils";
import { getQuoteSchema, GetQuoteSchema } from "@/validation/quote.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function MoodForm() {
  const { mutate, isPending } = usePostMood();

  const form = useForm<GetQuoteSchema>({
    resolver: zodResolver(getQuoteSchema),
    defaultValues: { mood: undefined },
  });

  const handleSubmit = (data: GetQuoteSchema) => {
    mutate(data);
  };

  return (
    <div className="w-full space-y-8 rounded-lg border bg-white p-4 shadow-md">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold">Select mood</h2>
        <p className="text-xs text-gray-600">Select your mood to get quote</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col items-center gap-4"
        >
          <FormField
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex w-full justify-center gap-4"
                  >
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="HAPPY" className="hidden" />
                      </FormControl>
                      <FormLabel
                        className={cn(
                          "flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md border font-normal text-gray-700 *:transition-all *:duration-300 *:ease-out",
                          field.value === "HAPPY" &&
                            "border-green-600 bg-green-50 font-medium text-green-800 *:scale-125",
                        )}
                      >
                        <HappyIcon />
                        Good mood
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="SAD" className="hidden" />
                      </FormControl>
                      <FormLabel
                        className={cn(
                          "flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md border font-normal text-gray-700 *:transition-all *:duration-300 *:ease-out",
                          field.value === "SAD" &&
                            "border-green-600 bg-green-50 font-medium text-green-800 *:scale-125",
                        )}
                      >
                        <SadIcon />
                        Bad mood
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Submit className="w-max" disabled={isPending}>
            Submit
          </Submit>
        </form>
      </Form>
    </div>
  );
}
