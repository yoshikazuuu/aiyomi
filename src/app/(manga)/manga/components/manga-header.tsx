"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "../../../../components/theme/theme-toggle";
import { HiSparkles } from "react-icons/hi";
import { MangaSearch } from "./manga-search";

export function MangaHeader() {
  const pathname = usePathname();
  const isMangaPage = pathname.startsWith("/manga/");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-14 gap-4 justify-between items-center">
        <Link
          href={isMangaPage ? "/manga" : "/"}
          className="mr-3 flex items-center space-x-1"
        >
          <HiSparkles
            className={isMangaPage ? "" : "animate-pulse text-primary"}
          />
          <span className="hidden font-bold sm:inline-block">aiyomi</span>
        </Link>

        <MangaSearch />
        <ModeToggle />
      </div>
    </header>
  );
}
