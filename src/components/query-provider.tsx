"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const client = new QueryClient();

interface Props {
  children: React.ReactNode;
}

export function QueryProvider({ children }: Props) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
