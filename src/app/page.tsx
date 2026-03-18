import Link from "next/link";

import { Hero } from "./components/hero";
import { About } from "./components/about";
import { Navbar } from "./components/navbar";
import { Contact } from "./components/contact";
import { Projects } from "./components/projects";

import { isAuthenticated } from "@/lib/auth";
import { findProjects } from "@/lib/project";

import { Button } from "@/components/ui/button";

export default async function Page() {
  const { data, success } = await findProjects("?limit=3");

  if (!success) {
    return <div>Error</div>;
  }

  const isAuth = await isAuthenticated();

  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <About />
      <Projects projects={data} />
      <Contact />
      {isAuth && (
        <Button className="fixed bottom-8 right-8 z-50" asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      )}
    </div>
  );
}
