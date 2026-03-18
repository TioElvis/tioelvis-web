"use client";
import { useProject } from "@/context/project-context";
import { RenderProject } from "@/components/render-project";

export default function Page() {
  const { project, sections } = useProject();

  return <RenderProject project={project} sections={sections} />;
}
