"use server";
import { cookies } from "next/headers";

import { API_URL } from "./constants";
import { Repository, Response } from "@/type";

export async function findRepos(): Promise<Response<Repository[]>> {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) {
      return {
        message: "Unauthorized",
        data: [],
        success: false,
      };
    }

    const response = await fetch(new URL("/github/find-all-repos", API_URL), {
      headers: {
        Cookie: `jwt=${jwt.value}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      return {
        message: json.message,
        data: [],
        success: false,
      };
    }

    return {
      message: json.message,
      data: json.data,
      success: true,
    };
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return {
      message: "An error occurred while fetching projects",
      data: [],
      success: false,
    };
  }
}
