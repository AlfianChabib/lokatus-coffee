"use client";

import { useUpdateQuote } from "@/hooks/admin/useUpdateQuote";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Row } from "@tanstack/react-table";
import { QuoteResponse } from "@/types/quote";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateQuoteSchema, updateQuoteSchema } from "@/validation/quote.validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Submit from "@/components/form-fields/Submit";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UpdateQuote({ payload }: { payload: Row<QuoteResponse> }) {
  const { mutate, isPending } = useUpdateQuote();

  const form = useForm({
    resolver: zodResolver(updateQuoteSchema),
    defaultValues: {
      content: payload.original.content,
      author: payload.original.author,
      mood: payload.original.mood,
      id: payload.original.id,
    },
  });

  const handleSubmit = (data: UpdateQuoteSchema) => {
    mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Update quote</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="grid space-y-8">
          <DialogTitle>Update quote</DialogTitle>
          <DialogDescription asChild>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="grid space-y-2">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Input {...field} />
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

                <Submit disabled={isPending}>Update</Submit>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
