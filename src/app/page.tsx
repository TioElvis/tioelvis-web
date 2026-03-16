import Image from "next/image";
import { Fragment } from "react/jsx-runtime";
import {
  IconChevronDown,
  IconCode,
  IconDatabase,
  IconServer2,
} from "@tabler/icons-react";

import { Ability } from "@/type";
import { Navbar } from "./components/navbar";
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

export default function Page() {
  return (
    <Fragment>
      <Navbar />
      {/* HERO */}
      <section className="relative min-h-screen grid place-items-center">
        <header className="absolute top-4 left-4 hidden sm:block">
          <div className="flex gap-2">
            <div className="flex items-center justify-center">
              <Image
                src="/VenezuelaFlag.png"
                alt="Venezuela flag"
                width={35}
                height={35}
                objectFit="contain"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] font-semibold tracking-[0.15em] text-muted-foreground">
                FULL STACK DEV
              </span>
              <span className="text-[9px] font-bold tracking-[0.15em] text-primary">
                BUILDING THE FUTURE
              </span>
            </div>
          </div>
        </header>
        <div className="text-center">
          <h1 className="text-8xl sm:text-[9rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem] font-black text-caracas">
            TioElvis
          </h1>
          <h3 className="font-light uppercase text-xl md:text-2xl tracking-widest">
            Full stack developer
          </h3>
        </div>
        <div className="absolute bottom-24 flex flex-col items-center text-muted-foreground">
          <IconChevronDown className="animate-bounce" />
        </div>
      </section>
      {/* ABOUT */}
      <main className="relative min-h-screen flex items-center justify-center">
        <MaxWidthWrapper className="space-y-8">
          <span className="text-primary font-bold text-xs">01 - ABOUT</span>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium mt-4">
            Building digital <br />
            <span className="text-primary">experiences.</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-12 sm:gap-4">
            <p className="w-fit tracking-widest text-muted-foreground">
              I am a Venezuelan guy, born in Caracas, and growing up I
              discovered my passion for computer science and application
              development. Now I am in Italy studying and improving my
              programming knowledge, and I want to use this portfolio/blog to
              document my projects through artificial intelligence.
            </p>
            <p className="w-fit tracking-widest text-muted-foreground">
              In the future, I want to keep learning new things in order to
              continuously sharpen my skills and knowledge.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ABILITIES.map(({ name, description, Icon }) => {
              return (
                <Card key={name} className="hover:ring-primary/50">
                  <CardHeader>
                    <Icon className="size-6 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-sm">{name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </main>
      {/* PROJECTS */}
      <section className="relative min-h-screen"></section>
      {/* CONTACT */}
      <footer className="relative min-h-[50vh]"></footer>
    </Fragment>
  );
}
