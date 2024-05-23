import { getAllEpisodeSource, getAnimeEpisodes, getAnimeInfo } from "@/lib/api";
import { anime } from "@/lib/anime";
import Link from "next/link";
import { Player } from "./components/player";
import { WatchAnimeWithInfo } from "./components/watch-anime-with-info";

export default async function AnimeInfo({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container py-10 flex min-min-h-[100dvh] flex-col w-screen justify-center items-center gap-2">
      <WatchAnimeWithInfo id={params.id} />
    </div>
  );
}
