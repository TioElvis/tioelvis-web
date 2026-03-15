import { redirect } from "next/navigation";
import { Fragment } from "react/jsx-runtime";

import { isAuthenticated } from "@/lib/auth";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  if (!(await isAuthenticated())) {
    return redirect("/auth/sign-in");
  }

  return <Fragment>{children}</Fragment>;
}
