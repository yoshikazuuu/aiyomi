import { ModeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { anime } from "@/lib/anime";

export default async function Anime() {
  const topAnime = await anime.fetchTopAiring();

  return (
    <div className="flex min-h-[100dvh] flex-col w-screen justify-center items-center gap-2">
      <div className="flex items-center gap-2">
        <Link href="/manga" prefetch>
          <Button>Manga</Button>
        </Link>
        <Link href="/novel" prefetch>
          <Button>Novel</Button>
        </Link>
        <ModeToggle />
      </div>
      <div>
        <h1>Top Anime</h1>
        <ul>
          {topAnime.results.map((anime, index) => (
            <Link key={index} href={`/anime/${anime.id}`}>
              <li>{anime.title as string}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
