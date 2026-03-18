import { Fragment } from "react/jsx-runtime";

import { Project, Section } from "@/type";

import { Badge } from "./ui/badge";
import { MarkdownViewer } from "./markdown-viewer";

interface Props {
  project: Project;
  sections: Section[];
}

export function RenderProject({ project, sections }: Props) {
  return (
    <main className="flex-1 space-y-8 p-4 md:p-8">
      <header id={project.slug} className="space-y-8">
        <h2 className="text-4xl uppercase font-semibold text-foreground">
          {project.title}
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => {
            return (
              <Badge variant="outline" key={tag}>
                {tag}
              </Badge>
            );
          })}
        </div>
        <MarkdownViewer content={project.content} />
      </header>
      {sections.map((s, index) => {
        return (
          <Fragment key={s._id}>
            <section id={s.slug} className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground">
                  {s.title}
                </h3>
                <MarkdownViewer content={s.content} />
              </div>
              <div className="space-y-8 pl-4 border-l">
                {s.sections?.map((sub) => {
                  return (
                    <section id={sub.slug} key={sub._id}>
                      <h4 className="text-xl font-medium text-foreground">
                        {sub.title}
                      </h4>
                      <MarkdownViewer content={sub.content} />
                    </section>
                  );
                })}
              </div>
            </section>
            {index !== sections.length - 1 && <hr />}
          </Fragment>
        );
      })}
    </main>
  );
}
