"use client";

import { DisplaySelectedImage } from "@/components/display-selected-image";
import { FileInputField } from "@/components/form-fields/FileInput";
import Submit from "@/components/form-fields/Submit";
import { buttonVariants } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import usePostImage from "@/hooks/image/usePostImage";
import { ACCEPTED_IMAGE_MIME_TYPES } from "@/utils/constants";
import { PostBackgroundSchema, postBackgroundSchema } from "@/validation/background";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

export default function ImageInput() {
  const { mutate: postImage, isPending } = usePostImage();

  const form = useForm<PostBackgroundSchema>({
    resolver: zodResolver(postBackgroundSchema),
    defaultValues: {
      image: null,
    },
  });

  const handleSubmit = (data: PostBackgroundSchema) => {
    postImage(data.image);
  };

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex h-full w-full flex-col items-center justify-center gap-2"
          >
            <DisplaySelectedImage />
            <FileInputField
              form={form}
              name="image"
              label="Choose image"
              placeholder="Logo"
              accept={ACCEPTED_IMAGE_MIME_TYPES.join(", ")}
              className={buttonVariants({
                className:
                  "cursor-pointer gap-2 bg-gradient-to-r from-red-600 to-yellow-600 font-normal",
              })}
            />
            <Submit disabled={isPending}>Post</Submit>
          </form>
        </Form>
      </div>
    </div>
  );
}
