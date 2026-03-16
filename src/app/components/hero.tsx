import Image from "next/image";
import { IconChevronDown } from "@tabler/icons-react";

export function Hero() {
  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center">
      <header className="hidden sm:flex absolute top-4 left-4 items-center gap-2">
        <Image
          src="/VenezuelaFlag.png"
          alt="Venezuela flag"
          width={35}
          height={35}
          objectFit="contain"
        />
        <div className="flex flex-col">
          <span className="text-[9px] font-semibold tracking-[0.15em] text-muted-foreground">
            FULL STACK DEV
          </span>
          <span className="text-[9px] font-bold tracking-[0.15em] text-primary">
            BUILDING THE FUTURE
          </span>
        </div>
      </header>
      <main className="text-center">
        <h1 className="text-caracas">TioElvis</h1>
        <h3 className="text-lg sm:text-xl md:text-2xl font-light tracking-widest">
          FULL STACK DEVELOPER
        </h3>
      </main>
      <footer className="absolute bottom-24 flex flex-col items-center text-muted-foreground">
        <IconChevronDown className="animate-bounce" />
      </footer>
    </section>
  );
}
