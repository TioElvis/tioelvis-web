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
      className={cn("h-11 w-11 md:w-10 md:h-10 rounded-full border", className)}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      {...props}
      suppressHydrationWarning>
      <IconSun
        className="size-5 md:size-4 dark:block hidden"
        suppressHydrationWarning
      />
      <IconMoon
        className="size-5 md:size-4 dark:hidden block"
        suppressHydrationWarning
      />
    </Button>
  );
}
