import { CarouselDApiDemo } from "@/app/(anime)/anime/carousel";
import Trending from "./trending";
import { Tabs } from "@/app/(anime)/anime/tabs";

export default async function Anime() {
  // const topAnime = await getPopular();
  // const trendingAnime = await getTrending(10);

  return (
    <div className="container flex min-h-[100svh] flex-col w-screen justify-start items-center gap-2">
      <CarouselDApiDemo>
        <Trending />
      </CarouselDApiDemo>
      <Tabs />
    </div>
  );
}
