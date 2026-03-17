import type { Icon } from "@tabler/icons-react";

export type Response<T> = {
  message: string;
  data: T;
  success: boolean;
};

export type Ability = {
  name: string;
  description: string;
  Icon: Icon;
};

export enum Languages {
  TYPESCRIPT = "TypeScript",
  JAVASCRIPT = "JavaScript",
  C = "C",
  GO = "Go",
  CPP = "C++",
  RUST = "Rust",
  JAVA = "Java",
  PYTHON = "Python",
}

export type Project = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  tags: string[];
  languages: Languages[];
  repositoryUrl?: string;
  demoUrl?: string;
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  next: number | null;
  prev: number | null;
};
