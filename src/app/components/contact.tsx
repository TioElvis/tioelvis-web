"use client";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export function Contact() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <motion.footer
      id="contact"
      initial={isDesktop ? { opacity: 0, y: 50 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "min-h-screen relative flex justify-center items-center bg-background",
        !isDesktop && "my-4",
      )}>
      <MaxWidthWrapper className="space-y-8">
        <span className="text-primary font-bold text-xs">03 - CONTACT</span>
      </MaxWidthWrapper>
    </motion.footer>
  );
}
