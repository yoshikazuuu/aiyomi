import { ModeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] w-screen justify-center items-center gap-2">
      <Link href="/anime" prefetch>
        <Button>Anime</Button>
      </Link>
      <Link href="/anime" prefetch>
        <Button>Manga</Button>
      </Link>
      <Link href="/anime" prefetch>
        <Button>Novel</Button>
      </Link>
      <ModeToggle />
    </div>
  );
}
