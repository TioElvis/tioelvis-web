import { IconCode, IconDatabase, IconServer2 } from "@tabler/icons-react";

import { Ability } from "@/type";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ABILITIES: Ability[] = [
  {
    name: "Frontend",
    description: "React, Next.js, TypeScript, Tailwind CSS, Motion.",
    Icon: IconCode,
  },
  {
    name: "Backend",
    description: "Node.js, Nestjs.",
    Icon: IconServer2,
  },
  {
    name: "Database",
    description: "PostgreSQL, MongoDB.",
    Icon: IconDatabase,
  },
];

export function About() {
  return (
    <main
      id="about"
      className="z-10 min-h-screen relative flex justify-center items-center bg-background my-8 py-16 lg:my-0 lg:py-0">
      <MaxWidthWrapper className="space-y-8">
        <span className="text-primary font-bold text-xs">01 - ABOUT</span>
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium mt-4">
          Building digital <br />
          <span className="text-primary">experiences.</span>
        </h2>
        <section className="grid sm:grid-cols-2 gap-12 sm:gap-4 tracking-widest text-muted-foreground">
          <p className="w-fit">
            I am a Venezuelan guy, born in Caracas, and growing up I discovered
            my passion for computer science and application development. Now I
            am in Italy studying and improving my programming knowledge, and I
            want to use this portfolio/blog to document my projects through
            artificial intelligence.
          </p>
          <p className="w-fit">
            In the future, I want to keep learning new things in order to
            continuously sharpen my skills and knowledge.
          </p>
        </section>
        <section className="grid md:grid-cols-3 gap-8">
          {ABILITIES.map(({ name, description, Icon }) => {
            return (
              <Card key={name} className="hover:ring-primary/50">
                <CardHeader>
                  <Icon className="size-6 text-primary" />
                </CardHeader>
                <CardContent>
                  <h3 className="text-sm">{name}</h3>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </MaxWidthWrapper>
    </main>
  );
}
