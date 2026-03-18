"use client";
import { toast } from "sonner";
import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";

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

import { API_URL } from "@/lib/constants";

interface Props {
  _id: string;
}

export function AlertDialogDeleteProject({ _id }: Props) {
  const [open, setOpen] = useState(false);

  const mutation = useMutation({
    mutationKey: ["delete-project", _id],
    mutationFn: async () => {
      const response = await fetch(new URL(`/project/delete/${_id}`, API_URL), {
        method: "DELETE",
        credentials: "include",
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }

      return json.message;
    },
    onSuccess: (message) => {
      toast.success(message, { description: "Recharging the page..." });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={mutation.isPending}>
          Delete <IconTrash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          Are you sure you want to delete this project?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone.
        </AlertDialogDescription>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel disabled={mutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}>
            {mutation.isPending ? <Spinner /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
