import { MangaInfo } from "./components/manga-info";

export default async function AnimeInfo({
  params,
}: {
  params: { titleId: string };
}) {
  return (
    <div className="container py-10 flex min-min-h-[100dvh] flex-col w-screen justify-center items-center gap-2">
      <MangaInfo id={params.titleId} />
    </div>
  );
}
