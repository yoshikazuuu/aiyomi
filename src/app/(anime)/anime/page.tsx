import { CarouselDApiDemo } from "@/app/(anime)/anime/components/carousel";
import Trending from "./components/trending";
import { Tabs } from "@/app/(anime)/anime/components/tabs";
import { Selection } from "./components/selection";
import { getAnimeWithType, getTrending } from "@/lib/api";

export default async function Anime() {
  const popularAnime = await getAnimeWithType("POPULARITY_DESC");
  const topAnime = await getAnimeWithType("SCORE_DESC");
  const trendingAnime = await getTrending(24);

  const data = {
    trendingAnime,
    topAnime,
    popularAnime,
  };

  return (
    <div className="container flex min-h-[100svh] flex-col w-screen justify-start items-center gap-5">
      <CarouselDApiDemo>
        <Trending />
      </CarouselDApiDemo>
      <Selection data={data} />
    </div>
  );
}
