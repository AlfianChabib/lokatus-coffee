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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useRequestQuote from "@/hooks/quotes/useRequestQuote";
import { RequestQuoteSchema, requestQuoteSchema } from "@/validation/quote.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function RequestQuoteForm() {
  const { mutate: requestQuote, isPending } = useRequestQuote();

  const form = useForm<RequestQuoteSchema>({
    resolver: zodResolver(requestQuoteSchema),
    defaultValues: { content: "", author: "", mood: undefined },
  });

  const handleSubmit = (data: RequestQuoteSchema) => {
    requestQuote(data);
  };

  return (
    <div className="w-full space-y-8 rounded-lg border bg-white p-4 shadow-md">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold">Request quote</h2>
        <p className="text-xs text-gray-600">
          Enter your quote and author name to send quote to admin
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mood</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HAPPY">Happy</SelectItem>
                      <SelectItem value="SAD">Sad</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Submit disabled={isPending}>Request</Submit>
        </form>
      </Form>
    </div>
  );
}
