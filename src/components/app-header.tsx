"use client";
import { IconMenu2 } from "@tabler/icons-react";

import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";

import { useProject } from "@/context/project-context";

export function AppHeader() {
  const { project } = useProject();
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    isMobile && (
      <header className="w-full h-12 flex items-center justify-between px-4 border-b">
        <span className="uppercase text-primary font-semibold">
          {project?.title}
        </span>
        <Button variant="ghost" size="icon-lg" onClick={toggleSidebar}>
          <IconMenu2 />
        </Button>
      </header>
    )
  );
}
