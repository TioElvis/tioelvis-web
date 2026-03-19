import Link from "next/link";
import { IconBrandGithub, IconLink } from "@tabler/icons-react";

import { Repository } from "@/type";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

import { AlertDialogDeleteProject } from "./alert-dialog-delete-project";
import { AlertDialogGenerateProject } from "./alert-dialog-generate-project";

interface Props {
  repo: Repository;
  index?: number;
}

export function CardRepo({ repo, index }: Props) {
  return (
    <Card className="cursor-pointer hover:ring-primary/50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="text-primary">
            {index !== undefined ? `0${index + 1}` : ""}
          </span>
          <CardTitle className="text-2xl font-bold">{repo.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{repo.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between md:justify-end gap-2">
        <Button asChild variant="outline">
          <Link href={repo.url} target="_blank" rel="noopener noreferrer">
            Github <IconBrandGithub />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={`/${repo.slug}`}>
            Documentation <IconLink />
          </Link>
        </Button>
        {repo.isPublished ? (
          <AlertDialogDeleteProject _id={repo._id ? repo._id : ""} />
        ) : (
          <AlertDialogGenerateProject name={repo.name} />
        )}
      </CardFooter>
    </Card>
  );
}
