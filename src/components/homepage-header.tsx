import Link from "next/link";
import { ModeToggle } from "./theme/theme-toggle";
import { HiSparkles } from "react-icons/hi";

export function HomepageHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-3 flex items-center space-x-1">
          <HiSparkles />
          <span className="hidden font-bold sm:inline-block">aiyomi</span>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
