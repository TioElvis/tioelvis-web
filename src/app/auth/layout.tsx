import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  if (await isAuthenticated()) {
    return redirect("/dashboard/projects");
  }

  return (
    <main className="w-full h-screen flex items-center justify-center px-4">
      {children}
    </main>
  );
}
