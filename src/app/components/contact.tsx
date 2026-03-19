import Link from "next/link";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

import type { Contact } from "@/type";

import { Button } from "@/components/ui/button";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

const CONTACT_METHODS: Contact[] = [
  {
    name: "GitHub",
    Icon: IconBrandGithub,
    href: "https://github.com/TioElvis",
  },
  {
    name: "LinkedIn",
    Icon: IconBrandLinkedin,
    href: "https://www.linkedin.com/in/elvis-vera-3657ba365/",
  },
];

export function Contact() {
  return (
    <footer
      id="contact"
      className="z-30 min-h-screen relative flex justify-center items-center bg-background my-8 py-16 lg:my-0 lg:py-0">
      <MaxWidthWrapper className="space-y-16">
        <span className="text-primary font-bold text-xs">03 - CONTACT</span>
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium mt-4">
          Let&apos;s work
          <br />
          <span className="text-primary">together.</span>
        </h2>
        <section className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-muted-foreground">
              I&apos;m always open to new opportunities, collaborations, and
              interesting projects. Whether you have a question or just want to
              say hi, feel free to reach out!
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Find me on</p>
            {CONTACT_METHODS.map(({ name, Icon, href }) => (
              <Button
                key={name}
                variant="ghost"
                size="lg"
                className="w-full h-14 mt-4 justify-start"
                asChild>
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  <Icon />
                  {name}
                </Link>
              </Button>
            ))}
          </div>
        </section>
        <section className="text-sm">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} TioElvis. All rights reserved.
          </p>
          <p className="text-muted-foreground">
            Built with ❤️ and lots of ☕ by TioElvis
          </p>
        </section>
      </MaxWidthWrapper>
    </footer>
  );
}
