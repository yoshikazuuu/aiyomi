import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { HiClock, HiMiniRectangleStack } from "react-icons/hi2";
import { getTrending } from "@/lib/anime";
import { CarouselItem } from "@/components/ui/carousel";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PiPlayFill } from "react-icons/pi";
import Link from "next/link";
import parse from "html-react-parser";

export default async function Trending() {
  const trendingAnime = await getTrending(10);
  return (
    <>
      {trendingAnime.results.map((anime, index) => (
        <CarouselItem key={index}>
          <CardContent className="container flex w-screen h-[500px] flex-col justify-start items-center gap-2">
            <div className="absolute -z-10 w-full h-[500px] flex justify-center items-start">
              <Image
                src={
                  anime.bannerImage || anime.coverImage.large || "/banner.jpg"
                }
                width={1920}
                height={1080}
                alt=""
                className="min-w-screen h-full object-cover"
              />

              <div className="absolute z-10 w-full h-full backdrop-blur-sm bg-gradient-to-t from-background to-background/50" />
            </div>
            <div className="flex w-full mt-14 flex-col h-[400px] justify-between gap-4 items-left p-4">
              <p className="text-2xl font-bold tracking-widest text-left">
                Popular Anime
              </p>
              <div className="flex flex-row gap-4 w-full h-full">
                <div className="aspect-[3/4.5] w-fit overflow-hidden h-fit rounded shadow-xl">
                  <Image
                    src={anime.coverImage.large || "/cover.jpg"}
                    width={300}
                    height={400}
                    alt=""
                    className="object-cover hover:scale-110 h-full ease-in-out duration-200"
                  />
                </div>

                <div className="flex flex-col w-full">
                  <p className="text-4xl tracking-tight font-extrabold text-left">
                    {anime.title.userPreferred}
                  </p>
                  <p className="text-xl mb-2 tracking-tight text-muted-foreground italic text-left">
                    {anime.title.native}
                  </p>
                  <div className="flex mb-3 flex-row gap-1 items-center">
                    {anime.genres.map((genre, index) => (
                      <Badge variant="secondary" key={index} className="mr-2">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-md h-[200px] overflow-scroll mb-2 tracking-tight text-muted-foreground text-left">
                    {parse(anime.description)}
                  </p>
                  <div className="flex gap-4 items-center justify-between">
                    <div className="flex gap-2">
                      {anime.format && (
                        <span className="flex items-center gap-2 font-semibold">
                          {anime.format}
                        </span>
                      )}
                      {anime.episodes && (
                        <span className="flex items-center gap-2 font-semibold">
                          <HiMiniRectangleStack /> {anime.episodes} Episodes
                        </span>
                      )}
                      {anime.duration && (
                        <span className="flex items-center gap-2 font-semibold">
                          {" "}
                          <HiClock /> {anime.duration} min
                        </span>
                      )}
                    </div>
                    <Link href={`/anime/${anime.id}`} prefetch>
                      <Button className="flex gap-3 text-2xl font-black tracking-tighter">
                        <PiPlayFill />
                        WATCH NOW
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </CarouselItem>
      ))}
    </>
  );
}
