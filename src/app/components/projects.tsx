"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { IconFolderCode, IconLink } from "@tabler/icons-react";

import { Project } from "@/type";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

interface Props {
  projects: Project[];
}

export function Projects({ projects }: Props) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <motion.section
      id="projects"
      initial={isDesktop ? { opacity: 0, y: 50 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "min-h-screen relative flex justify-center items-center bg-background",
        !isDesktop && "my-4",
      )}>
      <MaxWidthWrapper className="space-y-8">
        <span className="text-primary font-bold text-xs">02 - PROJECTS</span>
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium mt-4">
          Selected <br />
          <span className="text-primary">Projects.</span>
        </h2>
        <div className="grid grid-rows-3 gap-4">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="cursor-pointer hover:ring-primary/50">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
              <CardFooter className="flex-col items-start">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => {
                    return (
                      <Badge key={tag} className="text-xs" variant="outline">
                        {tag}
                      </Badge>
                    );
                  })}
                </div>
                <div className="w-full flex justify-end">
                  <Button className="w-full sm:w-auto" asChild>
                    <Link href={`/${project.slug}`}>
                      View Project <IconLink />
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
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
    </motion.section>
  );
}
