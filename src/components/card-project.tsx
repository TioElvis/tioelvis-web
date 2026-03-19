import Link from "next/link";
import { IconBrandGithub, IconLink } from "@tabler/icons-react";

import { Project } from "@/type";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface Props {
  project: Project;
  index?: number;
}

export function CardProject({ project, index }: Props) {
  return (
    <Card className="cursor-pointer hover:ring-primary/50 hover:scale-[1.01] transition-all duration-100">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-primary">
            {index !== undefined ? `0${index + 1}` : ""}
          </span>
          <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{project.description}</p>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => {
            return (
              <Badge key={tag} className="text-xs" variant="outline">
                {tag}
              </Badge>
            );
          })}
        </div>
        <div className="w-full flex flex-col md:flex-row justify-end gap-2">
          <Button asChild>
            <Link href={`/${project.slug}`}>
              Documentation <IconLink />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link
              href={project.repositoryUrl!}
              target="_blank"
              rel="noopener noreferrer">
              Github <IconBrandGithub />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
