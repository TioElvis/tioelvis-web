"use client";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { IconFolderCode, IconSearch } from "@tabler/icons-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { findProjects } from "@/lib/project";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CardProject } from "@/components/card-project";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// I don't know why I can't import this enum from "@/types" but works
enum Languages {
  TYPESCRIPT = "TypeScript",
  JAVASCRIPT = "JavaScript",
  C = "C",
  GO = "Go",
  CPP = "C++",
  RUST = "Rust",
  JAVA = "Java",
  PYTHON = "Python",
}

const languageColors: Record<Languages, string> = {
  [Languages.TYPESCRIPT]: "bg-blue-600 text-white",
  [Languages.JAVASCRIPT]: "bg-yellow-400 text-black",
  [Languages.C]: "bg-gray-700 text-white",
  [Languages.GO]: "bg-cyan-500 text-black",
  [Languages.CPP]: "bg-blue-800 text-white",
  [Languages.RUST]: "bg-orange-600 text-white",
  [Languages.JAVA]: "bg-red-600 text-white",
  [Languages.PYTHON]: "bg-blue-400 text-black",
};

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedLanguages, setSelectedLanguages] = useState<Languages[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const toggleLanguage = (language: Languages) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language],
    );
  };

  const query = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["projects", debouncedSearch, selectedLanguages],
    queryFn: async ({ pageParam }) => {
      const searchParam = debouncedSearch ? `&title=${debouncedSearch}` : "";

      const languageParams = selectedLanguages
        .map((lang) => `&languages=${encodeURIComponent(lang)}`)
        .join("");

      const response = await findProjects(
        `?limit=3&page=${pageParam}${searchParam}${languageParams}`,
      );

      if (!response.success) {
        throw new Error(response.message);
      }

      return response;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination) {
        if (lastPage.pagination.page < lastPage.pagination.totalPages) {
          return lastPage.pagination.page + 1;
        }
      }

      return undefined;
    },
  });

  if (query.isError) {
    return <div>Error al cargar los proyectos.</div>;
  }

  const projects = query.data?.pages.flatMap((page) => page.data) || [];

  return (
    <MaxWidthWrapper className="min-h-screen flex flex-col py-12 gap-4">
      <h2 className="text-5xl sm:text-6xl my-4">
        TioElvis <span className="text-primary">Projects.</span>
      </h2>
      <header className="flex flex-col gap-4">
        <InputGroup className="max-w-xs h-10">
          <InputGroupInput
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroupAddon>
            <IconSearch />
          </InputGroupAddon>
        </InputGroup>
        <div className="flex flex-wrap gap-2">
          {Object.values(Languages).map((lang) => {
            const isSelected = selectedLanguages.includes(lang);

            return (
              <Badge
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer"
                key={lang}
                onClick={() => toggleLanguage(lang)}>
                {lang}
                <span
                  className={cn(
                    `ml-2 w-3 h-3 rounded-full ${languageColors[lang]}`,
                  )}>
                  &nbsp;
                </span>
              </Badge>
            );
          })}
        </div>
      </header>
      {query.isFetching && !query.isFetchingNextPage && (
        <section className="flex items-center justify-center py-10 gap-2">
          <Spinner /> <p>Loading projects...</p>
        </section>
      )}
      {projects.length === 0 && !query.isFetching && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconFolderCode />
            </EmptyMedia>
            <EmptyTitle>No Projects Found</EmptyTitle>
            <EmptyDescription>
              It seems that there are no projects matching your search or
              selected filters.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
      <div className="flex flex-col gap-4 mt-4">
        {projects.map((project, index) => {
          return (
            <CardProject key={project._id} project={project} index={index} />
          );
        })}
      </div>
      {projects.length > 0 && (
        <Button
          className="w-full"
          onClick={() => query.fetchNextPage()}
          disabled={!query.hasNextPage || query.isFetchingNextPage}>
          {query.isFetchingNextPage ? (
            <Spinner />
          ) : query.hasNextPage ? (
            "Load More"
          ) : (
            "No more projects"
          )}
        </Button>
      )}
    </MaxWidthWrapper>
  );
}
