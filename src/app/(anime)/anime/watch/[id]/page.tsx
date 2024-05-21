import { anime } from "@/lib/anime";

export default async function AnimeWatch({
  params,
}: {
  params: { id: string };
}) {
  const info = await anime.fetchEpisodeSources(params.id).then(console.log);

  return (
    <div className="flex min-min-h-[100dvh] flex-col w-screen justify-center items-center gap-2">
      {/* {info.episodes?.map((episode, index) => (
        <div key={index}>
          <p>{episode.id}</p>
        </div>
      ))} */}
    </div>
  );
}
