import { anime } from "@/lib/anime";
import Link from "next/link";

export default async function AnimeInfo({
  params,
}: {
  params: { title: string };
}) {
  const info = await anime.fetchAnimeInfo(params.title);

  return (
    <div className="flex min-min-h-[100dvh] flex-col w-screen justify-center items-center gap-2">
      {info.episodes?.map((episode, index) => (
        <Link href={`/anime/watch/${episode.id}`} key={index}>
          <p>{episode.id}</p>
        </Link>
      ))}
    </div>
  );
}
