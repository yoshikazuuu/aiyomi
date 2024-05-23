import { anime } from "@/lib/anime";
import ReactPlayer from "react-player";
import { Player } from "../../[id]/components/player";

export default async function AnimeWatch({
  params,
}: {
  params: { id: string };
}) {
  const watch = await anime.fetchEpisodeSources(params.id);

  return (
    <div className="flex min-min-h-[100dvh] flex-col w-screen justify-center items-center gap-2">
      <Player
        url={
          watch.sources.find((source) => source.quality === "default")?.url ||
          ""
        }
      />
    </div>
  );
}
