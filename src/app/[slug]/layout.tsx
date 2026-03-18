import { findProjectBySlug } from "@/lib/project";

import { ProjectProvider } from "@/context/project-context";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface Props {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function Layout({ children, params }: Props) {
  const { slug } = await params;

  const response = await findProjectBySlug(slug);

  if (!response.success) {
    return <div>Error</div>;
  }

  const project = response.data!.project;
  const sections = response.data!.sections;

  return (
    <SidebarProvider className="relative">
      <ProjectProvider project={project} sections={sections}>
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <AppHeader />
          {children}
        </SidebarInset>
      </ProjectProvider>
      <ModeToggle className="absolute bottom-4 right-4 md:bottom-8 md:right-8" />
    </SidebarProvider>
  );
}
