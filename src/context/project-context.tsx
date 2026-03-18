"use client";
import { Project, Section } from "@/type";
import { createContext, useContext } from "react";

interface Context {
  project: Project;
  sections: Section[];
}

const ProjectContext = createContext<Context | null>(null);

interface Props {
  project: Project;
  sections: Section[];
  children: React.ReactNode;
}

export function ProjectProvider({ project, sections, children }: Props) {
  return (
    <ProjectContext.Provider value={{ project, sections }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const project = useContext(ProjectContext);

  if (!project) {
    throw new Error("useProject must be used within a ProjectProvider");
  }

  return project;
}
