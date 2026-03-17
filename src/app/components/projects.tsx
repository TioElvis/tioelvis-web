"use client";
import { motion } from "motion/react";

import { Project } from "@/type";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

interface Props {
  projects: Project[];
}

export function Projects({ projects }: Props) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  console.log(projects);

  return (
    <motion.section
      id="projects"
      initial={isDesktop ? { opacity: 0, y: 50 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen relative flex justify-center items-center bg-background">
      <MaxWidthWrapper className="space-y-8">
        <span className="text-primary font-bold text-xs">02 - PROJECTS</span>
      </MaxWidthWrapper>
    </motion.section>
  );
}
