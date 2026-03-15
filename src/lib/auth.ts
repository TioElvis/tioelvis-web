import { cookies } from "next/headers";

import { API_URL } from "./constants";

export async function isAuthenticated() {
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get("jwt");

    if (!jwt) return false;

    const response = await fetch(new URL("/auth/verify-jwt", API_URL), {
      headers: {
        Cookie: `jwt=${jwt.value}`,
      },
    });

    return response.ok;
  } catch {
    return false;
  }
}
