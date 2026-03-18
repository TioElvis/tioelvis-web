"use client";
import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = React.HTMLAttributes<HTMLButtonElement>;

export function ModeToggle({ className, ...props }: Props) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="secondary"
      className={cn("w-8 h-8 md:h-10 md:w-10 rounded-full border", className)}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      {...props}
      suppressHydrationWarning>
      <IconSun className="size-4 dark:block hidden" suppressHydrationWarning />
      <IconMoon className="size-4 dark:hidden block" suppressHydrationWarning />
    </Button>
  );
}
