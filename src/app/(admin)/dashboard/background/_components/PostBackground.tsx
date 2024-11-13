"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { PostBackgroundSchema, postBackgroundSchema } from "@/validation/background";
import usePostImage from "@/hooks/image/usePostImage";
import { Form } from "@/components/ui/form";
import { DisplaySelectedImage } from "@/components/display-selected-image";
import { FileInputField } from "@/components/form-fields/FileInput";
import { ACCEPTED_IMAGE_MIME_TYPES } from "@/utils/constants";
import Submit from "@/components/form-fields/Submit";
import { Plus } from "lucide-react";

export function PostBackground() {
  const { mutate: postImage, isPending } = usePostImage();

  const form = useForm<PostBackgroundSchema>({
    resolver: zodResolver(postBackgroundSchema),
    defaultValues: { image: null },
  });

  const handleSubmit = (data: PostBackgroundSchema) => {
    postImage(data.image);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-9 w-9 sm:w-auto">
          <span className="sr-only">Post background</span>
          <span className="hidden text-sm font-medium leading-none sm:flex">Post background</span>
          <Plus className="sm:hidden" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[96%] rounded-md sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Post background</DialogTitle>
          <DialogDescription>Post a background. You can only post 5 backgrounds</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex w-full flex-col items-center justify-center gap-2"
          >
            <DisplaySelectedImage />
            <div className="flex items-center justify-center gap-2">
              <FileInputField
                form={form}
                name="image"
                label="Choose image"
                placeholder="Logo"
                accept={ACCEPTED_IMAGE_MIME_TYPES.join(", ")}
                className={buttonVariants({ variant: "outline" })}
              />
              <Submit disabled={isPending}>Post</Submit>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
