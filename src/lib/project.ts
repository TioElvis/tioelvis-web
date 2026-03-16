"use server";
import { API_URL } from "./constants";
import type { Pagination, Project, Response } from "@/type";

interface ResponseFindProjects extends Response<Project[]> {
  pagination: Pagination | undefined;
}

export async function findProjects(
  query: string,
): Promise<ResponseFindProjects> {
  try {
    const response = await fetch(new URL(`/project/find${query}`, API_URL));

    const json = await response.json();

    if (!response.ok) {
      return {
        message: json.message,
        data: [],
        pagination: undefined,
        success: false,
      };
    }

    return {
      message: json.message,
      data: json.data,
      pagination: json.pagination,
      success: true,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);

    return {
      message: "An error occurred while fetching projects",
      data: [],
      pagination: undefined,
      success: false,
    };
  }
}
