"use client";
import Link from "next/link";
import { useMemo } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { useProject } from "@/context/project-context";
import { useActiveSection } from "@/hooks/use-active-section";

export function AppSidebar() {
  const { project, sections } = useProject();

  const allSectionIds = useMemo(() => {
    const ids = [project.slug];
    sections.forEach((sec) => {
      ids.push(sec.slug);
      if (sec.sections) {
        sec.sections.forEach((sub) => ids.push(sub.slug));
      }
    });
    return ids;
  }, [project, sections]);

  const activeSectionId = useActiveSection(allSectionIds);

  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold uppercase tracking-wider text-primary">
            {project.title}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSectionId === project.slug}
                  asChild>
                  <Link href={`#${project.slug}`}>Overview</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {sections.map((section) => (
                <SidebarMenuItem key={section._id}>
                  <SidebarMenuButton
                    isActive={activeSectionId === section.slug}
                    asChild>
                    <Link href={`#${section.slug}`}>{section.title}</Link>
                  </SidebarMenuButton>
                  {section.sections && section.sections.length > 0 && (
                    <SidebarMenuSub>
                      {section.sections.map((sub) => (
                        <SidebarMenuSubItem key={sub._id}>
                          <SidebarMenuSubButton
                            isActive={activeSectionId === sub.slug}
                            asChild>
                            <Link href={`#${sub.slug}`}>{sub.title}</Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
