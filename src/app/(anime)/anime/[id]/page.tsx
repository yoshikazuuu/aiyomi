import { getAnimeEpisodes, getAnimeInfo } from "@/lib/amvstrm";
import { anime } from "@/lib/anime";
import Link from "next/link";

export default async function AnimeInfo({
  params,
}: {
  params: { id: string };
}) {
  const info = await getAnimeInfo(params.id);
  const episodes = await getAnimeEpisodes(params.id);

  return (
    <div className="flex min-min-h-[100dvh] flex-col w-screen justify-center items-center gap-2">
      <div>
        <h1>{info.title.english}</h1>
        <p>{info.description}</p>
        <Link href="/anime" prefetch>
          Back
        </Link>
      </div>
      <div>
        <h1>Episodes</h1>
        <ul>
          {episodes.episodes.map((episode, index) => (
            <Link key={index} href={`/anime/watch/${episode.id}`}>
              <li>{episode.title}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
