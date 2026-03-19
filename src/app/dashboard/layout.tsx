import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/auth";
import { SignOutButton } from "@/components/sign-out-button";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  if (!(await isAuthenticated())) {
    return redirect("/auth/sign-in");
  }

  return (
    <div className="relative">
      {children} <SignOutButton />
    </div>
  );
}
