import { ReadChapter } from "./components/read-chapter";

export default async function Chapter({
  params,
}: {
  params: { chapterId: string };
}) {
  return (
    <div className="container flex min-min-h-[100dvh] flex-col w-screen justify-center items-center gap-2">
      <ReadChapter id={params.chapterId} />
    </div>
  );
}
