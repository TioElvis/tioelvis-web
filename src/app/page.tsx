import { Hero } from "./components/hero";
import { About } from "./components/about";
import { Navbar } from "./components/navbar";
import { Contact } from "./components/contact";
import { Projects } from "./components/projects";

import { findProjects } from "@/lib/project";
import { ErrorMessage } from "@/components/error-message";

import { Fragment } from "react/jsx-runtime";

export default async function Page() {
  const response = await findProjects("?limit=3");

  if (!response.success) {
    return <ErrorMessage message={response.message} />;
  }

  return (
    <Fragment>
      <Navbar />
      <Hero />
      <About />
      <Projects projects={response.data} />
      <Contact />
    </Fragment>
  );
}
