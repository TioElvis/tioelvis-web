import "./globals.css";
import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";

import { cn } from "@/lib/utils";
import { DOMAIN } from "@/lib/constants";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";

const notoSerif = Noto_Serif({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: {
    default: "TioElvis | Elvis Vera - Personal Development Blog",
    template: "%s | TioElvis",
  },
  description:
    "Personal development blog by Elvis Vera (TioElvis) where I document my projects, code, and continuous learning.",
  keywords: [
    "Elvis Vera",
    "TioElvis",
    "Software Development",
    "Personal blog",
    "Portfolio",
    "Programming",
  ],
  authors: [{ name: "Elvis Vera", url: DOMAIN }],
  creator: "Elvis Vera",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: DOMAIN,
    title: "TioElvis | Elvis Vera's Blog",
    description:
      "Join me on my personal development journey and discover the projects I'm working on.",
    siteName: "TioElvis",
  },
  twitter: {
    card: "summary_large_image",
    title: "TioElvis | Elvis Vera",
    description: "Personal development blog by Elvis Vera.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Readonly<Props>) {
  return (
    <html
      lang="en"
      className={cn("font-serif relative", notoSerif.variable)}
      suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster richColors />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
