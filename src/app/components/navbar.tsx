"use client";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const getOffsetTop = (element: HTMLElement | null) => {
  let offsetTop = 0;
  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent as HTMLElement | null;
  }
  return offsetTop;
};

export function Navbar() {
  const { scrollY } = useScroll();
  const [active, setActive] = useState("");

  const x = useTransform(scrollY, [0, 300], ["0%", "50%"]);
  const right = useTransform(scrollY, [0, 300], ["1rem", "50%"]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY + window.innerHeight / 2;

      const sections = ["about", "projects", "contact"];
      let currentSection = "";

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const elementPosition = getOffsetTop(element);

          if (currentScroll >= elementPosition) {
            currentSection = sections[i];
            break;
          }
        }
      }

      if (window.scrollY < 300) {
        setActive("");
      } else if (currentSection) {
        setActive(
          currentSection.charAt(0).toUpperCase() + currentSection.slice(1),
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onClick = (e: string) => {
    const element = document.getElementById(e.toLowerCase());
    if (element) {
      const targetPosition = getOffsetTop(element);
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      setActive(e);
    }
  };

  return (
    <motion.nav
      className="fixed z-50 top-4 right-0 flex items-center gap-2"
      style={{ right, x }}>
      <div className="flex items-center gap-0.5 border bg-background rounded-full p-1">
        {["About", "Projects", "Contact"].map((e) => {
          return (
            <Button
              variant={active === e ? "default" : "fill-up"}
              className="p-4 rounded-2xl"
              key={e}
              onClick={() => onClick(e)}>
              <span className="text-xs">{e}</span>
            </Button>
          );
        })}
      </div>
      <ModeToggle />
    </motion.nav>
  );
}
