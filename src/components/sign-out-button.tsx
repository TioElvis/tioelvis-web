"use client";
import { toast } from "sonner";
import { IconLogout } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";

import { API_URL } from "@/lib/constants";

import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export function SignOutButton() {
  const mutation = useMutation({
    mutationKey: ["signOut"],
    mutationFn: async () => {
      const response = await fetch(new URL("/auth/sign-out", API_URL), {
        credentials: "include",
        method: "POST",
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }

      return json.message;
    },
    onSuccess: (message) => {
      toast.success(message, { description: "Redirecting..." });

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
    onError: (error) => {
      toast.error((error as Error).message);
    },
  });

  return (
    <Button
      onClick={() => mutation.mutate()}
      className="fixed bottom-8 right-8"
      disabled={mutation.isPending}>
      {mutation.isPending ? (
        <Spinner />
      ) : (
        <>
          Sign Out <IconLogout />
        </>
      )}
    </Button>
  );
}
