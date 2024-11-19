"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Pencil } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUpdateRequestQuote from "@/hooks/quotes/useUpdateRequestQuote";
import { UpdateRequestQuoteSchema, updateRequestQuoteSchema } from "@/validation/quote.validation";
import { RequestQuoteResponse } from "@/types/quote";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function UpdateRequestQuote({ quote }: { quote: RequestQuoteResponse }) {
  const { mutate: updateQuote, isPending } = useUpdateRequestQuote();

  const form = useForm<UpdateRequestQuoteSchema>({
    resolver: zodResolver(updateRequestQuoteSchema),
    defaultValues: { mood: quote.mood, author: quote.author, content: quote.content, id: quote.id },
  });

  const handleSubmit = async (data: UpdateRequestQuoteSchema) => {
    updateQuote(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"outline"} className="size-7">
          <Pencil className="size-4" />
        </Button>
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
                <Submit disabled={isPending}>Update</Submit>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
