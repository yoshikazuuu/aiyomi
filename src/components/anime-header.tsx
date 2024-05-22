import Link from "next/link";
import { ModeToggle } from "./theme/theme-toggle";
import { HiSparkles } from "react-icons/hi";
import { SearchNavbar } from "./search";

export function AnimeHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-14 gap-4 justify-between items-center">
        <Link href="/" className="mr-3 flex items-center space-x-1">
          <HiSparkles />
          <span className="hidden font-bold sm:inline-block">aiyomi</span>
        </Link>
        <SearchNavbar />
        <ModeToggle />
      </div>
    </header>
  );
}
