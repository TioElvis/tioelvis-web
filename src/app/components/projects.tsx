import Link from "next/link";
import { IconFolderCode, IconLink } from "@tabler/icons-react";

import { Project } from "@/type";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { CardProject } from "@/components/card-project";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

interface Props {
  projects: Project[];
}

export function Projects({ projects }: Props) {
  return (
    <section
      id="projects"
      className="z-30 min-h-screen relative flex justify-center items-center bg-background my-8 py-16 lg:my-0 lg:py-0">
      <MaxWidthWrapper className="space-y-8">
        <span className="text-primary font-bold text-xs">02 - PROJECTS</span>
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium mt-4">
          Selected <br />
          <span className="text-primary">Projects.</span>
        </h2>
        <div className="grid grid-rows-3 gap-4">
          {projects.map((project, index) => (
            <CardProject key={project._id} project={project} index={index} />
          ))}
        </div>
        {projects.length > 0 && (
          <div className="w-full flex justify-end">
            <Button className="w-full" asChild>
              <Link href="/projects">
                View All Projects <IconLink />
              </Link>
            </Button>
          </div>
        )}
        {projects.length === 0 && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <IconFolderCode />
              </EmptyMedia>
              <EmptyTitle>No Projects Yet</EmptyTitle>
              <EmptyDescription>
                It seems that there are no projects to display at the moment.
                Please check back later for updates.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </MaxWidthWrapper>
    </section>
  );
}
