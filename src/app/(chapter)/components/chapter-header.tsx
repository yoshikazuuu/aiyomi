import { MangaSearch } from "@/app/(manga)/manga/components/manga-search";
import { ModeToggle } from "@/components/theme/theme-toggle";
import Link from "next/link";

import { HiSparkles } from "react-icons/hi";

export function ChapterHeader() {
  return (
    <header className="top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-14 gap-4 justify-between items-center">
        <Link href="/" className="mr-3 flex items-center space-x-1">
          <HiSparkles />
          <span className="hidden font-bold sm:inline-block">aiyomi</span>
        </Link>
        <MangaSearch />
        <ModeToggle />
      </div>
    </header>
  );
}
