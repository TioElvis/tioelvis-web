"use client";
import * as z from "zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { API_URL } from "@/lib/constants";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function Page() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      form.reset();

      const response = await fetch(new URL("/auth/sign-in", API_URL), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }

      return json.message;
    },
    onSuccess: (message) => {
      toast.success(message, {
        description: "Redirecting to dashboard projects...",
      });

      setTimeout(() => {
        window.location.href = "/dashboard/projects";
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = form.handleSubmit(async (values) => mutation.mutate(values));

  return (
    <Card className="w-full md:w-96 space-y-2">
      <CardHeader>
        <CardTitle>Login into TioElvis</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="sign-in" onSubmit={onSubmit}>
          <FieldGroup className="space-y-2">
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-sign-in-username">
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-sign-in-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-sign-in-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-sign-in-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" form="sign-in">
          {mutation.isPending ? <Spinner /> : "Sign In"}
        </Button>
      </CardFooter>
    </Card>
  );
}
