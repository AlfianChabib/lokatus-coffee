import useUpdateImage from "@/hooks/image/useUpdateImage";
import { updateBackgroundSchema, UpdateBackgroundSchema } from "@/validation/background";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DisplaySelectedImage } from "@/components/display-selected-image";
import { Form } from "@/components/ui/form";
import { Pencil } from "lucide-react";
import { FileInputField } from "@/components/form-fields/FileInput";
import { ACCEPTED_IMAGE_MIME_TYPES } from "@/utils/constants";
import Submit from "@/components/form-fields/Submit";

export default function UpdateBackground({ id }: { id: string }) {
  const { mutate: updateImage, isPending } = useUpdateImage();

  const form = useForm<UpdateBackgroundSchema>({
    resolver: zodResolver(updateBackgroundSchema),
    defaultValues: { image: null, id: id },
  });

  const handleSubmit = (data: UpdateBackgroundSchema) => {
    updateImage({ id: id, image: data.image });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="size-8">
          <span className="sr-only">Update background</span>
          <Pencil strokeWidth={1} className="text-gray-800" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[96%] rounded-md sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update background</DialogTitle>
          <DialogDescription>
            Update a background. replace the current background with a new one.
          </DialogDescription>
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
              <Submit disabled={isPending}>Update</Submit>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
