import { Fragment } from "react/jsx-runtime";

import { findProjects } from "@/lib/project";

import { Hero } from "./components/hero";
import { About } from "./components/about";
import { Navbar } from "./components/navbar";
import { Contact } from "./components/contact";
import { Projects } from "./components/projects";

export default async function Page() {
  const { data, success } = await findProjects("?limit=3");

  if (!success) {
    return <div>Error</div>;
  }

  return (
    <Fragment>
      <Navbar />
      <Hero />
      <About />
      <Projects projects={data} />
      <Contact />
    </Fragment>
  );
}
