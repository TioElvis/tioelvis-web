"use client";
import { useEffect, useState } from "react";
import { IconMenu2 } from "@tabler/icons-react";

import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";

import { cn } from "@/lib/utils";
import { useProject } from "@/context/project-context";

export function AppHeader() {
  const [showTitle, setShowTitle] = useState(false);

  const { project } = useProject();
  const { toggleSidebar, isMobile } = useSidebar();

  useEffect(() => {
    if (!isMobile || !project?.slug) return;

    const targetElement = document.getElementById(project.slug);

    if (!targetElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowTitle(!entry.isIntersecting);
      },
      { threshold: 0.9 },
    );

    observer.observe(targetElement);

    return () => observer.disconnect();
  }, [isMobile, project?.slug]);

  if (!isMobile) return null;

  return (
    <header className="w-full h-12 flex items-center justify-between border-b sticky top-0 bg-background z-10 pr-4 transition-all duration-300">
      <Button variant="ghost" onClick={toggleSidebar}>
        <IconMenu2 className="size-7" />
      </Button>
      <span
        className={cn(
          "uppercase text-2xl font-semibold transition-opacity duration-300",
          showTitle ? "opacity-100" : "opacity-0",
        )}>
        {project?.title}
      </span>
    </header>
  );
}
