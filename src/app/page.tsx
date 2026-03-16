import { Fragment } from "react/jsx-runtime";

import { Hero } from "./components/hero";
import { About } from "./components/about";
import { Navbar } from "./components/navbar";
import { Contact } from "./components/contact";
import { Projects } from "./components/projects";

export default function Page() {
  return (
    <Fragment>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </Fragment>
  );
}
