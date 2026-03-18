"use client";
import z from "zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconFile } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Project } from "@/type";
import { API_URL } from "@/lib/constants";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { Textarea } from "./ui/textarea";
import { Field, FieldGroup, FieldLabel } from "./ui/field";

const formSchema = z.object({
  additionalPrompt: z.string().optional(),
});

interface Props {
  name: string;
}

export function AlertDialogGenerateProject({ name }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      additionalPrompt: "",
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["generate-project"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch(new URL("/gemini/generate", API_URL), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          additionalPrompt: values.additionalPrompt,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }

      return { message: json.message, data: json.data as Project };
    },
    onSuccess: (response) => {
      toast.success(response.message, {
        description: "Redirecting to project page...",
      });

      setTimeout(() => {
        router.push(`/${response.data.slug}`);
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = form.handleSubmit(async (values) => mutation.mutate(values));

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          Publish <IconFile />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Generate Project</AlertDialogTitle>
        <AlertDialogDescription>
          This will generate a new project based on the selected repository
        </AlertDialogDescription>
        <form id="generate-project" onSubmit={onSubmit}>
          <FieldGroup>
            <Controller
              name="additionalPrompt"
              control={form.control}
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="additionalPrompt-input">
                      Additional Prompt
                    </FieldLabel>
                    <Textarea
                      id="additionalPrompt-input"
                      placeholder="Write an additional prompt to generate this project"
                      {...field}
                    />
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel disabled={mutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <Button
              type="submit"
              form="generate-project"
              disabled={mutation.isPending}>
              {mutation.isPending ? <Spinner /> : "Generate Project"}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
