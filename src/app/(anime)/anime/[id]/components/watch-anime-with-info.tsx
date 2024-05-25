"use client";
import {
  getAllEpisodeSource,
  getAnimeEpisodes,
  getAnimeInfo,
  getAnimeInfoGogo,
  getAnimeRecommendation,
  getEpisodeSource,
} from "@/lib/anime";
import { AnimeEpisodes, AnimeInfo, Result } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { ReactNode, Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Player } from "./player";
import { ISource } from "@consumet/extensions";
import { ep, es } from "@vidstack/react/types/vidstack-react.js";
import parse from "html-react-parser";
import { SiAnilist, SiMyanimelist } from "react-icons/si";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

import { HiClock, HiMiniRectangleStack } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { PiPlayFill } from "react-icons/pi";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { AnimeCard } from "../../components/card";
import { ImSpinner2 } from "react-icons/im";

export function WatchAnimeWithInfo({ id }: { id: string }) {
  const { data: animeInfo, isLoading: animeInfoLoading } = useQuery({
    queryKey: ["info", id],
    queryFn: () => getAnimeInfo(id),
    staleTime: 1000 * 60,
  });

  const { data: animeRecomendation, isLoading: animeRecomentationLoading } =
    useQuery({
      queryKey: ["recomendation", id],
      queryFn: () => getAnimeRecommendation(id),
      staleTime: 1000 * 60,
    });

  return (
    <>
      <Player
        gogoId={animeInfo?.id_provider.idGogo || ""}
        bannerImage={
          animeInfo?.coverImage.extraLarge ||
          animeInfo?.coverImage.large ||
          animeInfo?.coverImage.medium ||
          "/poster.jpg"
        }
      />

      <div className="relative w-full border rounded overflow-hidden">
        {animeInfoLoading ? (
          <div className="flex w-full h-full justify-center items-center">
            <ImSpinner2
              className="animate-spin text-muted-foreground"
              size={50}
            />
          </div>
        ) : (
          animeInfo && <AnimeDetails animeInfo={animeInfo} />
        )}
      </div>

      <div className="relative w-full min-h-[400px] border rounded p-10">
        {animeInfoLoading || animeRecomentationLoading ? (
          <div className="flex w-full h-full justify-center items-center">
            <ImSpinner2
              className="animate-spin text-muted-foreground"
              size={50}
            />
          </div>
        ) : (
          animeInfo &&
          animeRecomendation && (
            <RelatedAnime
              animeInfo={animeInfo}
              animeRecomendation={animeRecomendation}
            />
          )
        )}
      </div>
    </>
  );
}

function RelatedAnime({
  animeInfo: anime,
  animeRecomendation: recomendation,
}: {
  animeInfo: AnimeInfo;
  animeRecomendation: Result[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-2xl font-bold tracking-tight text-left">Related</p>
      <div className="grid grid-cols-6 mb-5 gap-4">
        {anime.relation.map((anime, index) => (
          <AnimeCard key={index} anime={anime} />
        ))}
      </div>
      <p className="text-2xl font-bold tracking-tight text-left">
        Recommendation
      </p>
      <div className="grid grid-cols-6 gap-4">
        {recomendation.map((anime, index) => (
          <AnimeCard key={index} anime={anime} />
        ))}
      </div>
    </div>
  );
}

function AnimeDetails({ animeInfo: anime }: { animeInfo: AnimeInfo }) {
  return (
    <>
      <div className="relative flex w-full flex-col h-fit justify-start gap-4 items-left">
        <div className="inset-0 absolute -z-10  w-full h-[400px] flex justify-center items-start">
          <Image
            src={anime.bannerImage || anime.coverImage.large || "/banner.jpg"}
            width={1920}
            height={1080}
            alt=""
            className="min-w-screen h-full object-cover"
          />

          <div className="absolute z-10 w-full h-full backdrop-blur-sm bg-gradient-to-t from-background to-background/50" />
        </div>
        <div className="flex p-10 flex-row gap-4 w-full h-full">
          <div className="flex gap-2 flex-col">
            <div className="aspect-[3/4.5] w-fit overflow-hidden h-fit rounded shadow-xl">
              <Image
                src={anime.coverImage.large || "/cover.jpg"}
                width={300}
                height={400}
                alt=""
                className="object-cover shadow-xl hover:scale-110 h-full ease-in-out duration-200"
              />
            </div>
            {anime.trailer && (
              <Link
                href={`https://${anime.trailer.site}.com/watch/${anime.trailer.id}`}
                target="_blank"
              >
                <Button className="font-bold w-full text-lg">TRAILER</Button>
              </Link>
            )}
            <div className="grid grid-cols-2 gap-2">
              <Link
                href={`https://anilist.co/anime/${anime.id}`}
                target="_blank"
              >
                <Button variant="secondary" className="w-full">
                  <SiAnilist size={20} />
                </Button>
              </Link>
              <Link
                href={`https://myanimelist.net/anime/${anime.idMal}`}
                target="_blank"
              >
                <Button variant="secondary" className="w-full">
                  <SiMyanimelist size={40} />
                </Button>
              </Link>
            </div>
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
            <p className="text-md mb-10 h-fit overflow-scroll tracking-tight text-muted-foreground text-left">
              {parse(anime.description)}
            </p>

            <div className="grid text-muted-foreground grid-cols-2">
              <div>
                <p className="flex gap-2">
                  Type: <Accent>{anime.format}</Accent>
                </p>

                <p className="flex gap-2">
                  Year: <Accent>{anime.year}</Accent>
                </p>

                <p className="flex gap-2">
                  Status: <Accent>{anime.status}</Accent>
                </p>

                <p className="flex gap-2">
                  Rating:
                  <Accent>
                    <Star size={15} color="#ebe534" />
                    {anime.score.decimalScore}
                  </Accent>
                </p>

                <p className="flex gap-2">
                  Studios:{" "}
                  <Accent>
                    {anime.studios.map((studios, index) => (
                      <Badge key={index}>{studios.name}</Badge>
                    ))}
                  </Accent>
                </p>
              </div>

              <div>
                <p className="flex gap-2">
                  Episodes: <Accent>{anime.episodes}</Accent>
                </p>

                <p className="flex gap-2">
                  Duration: <Accent>{anime.duration}</Accent>
                </p>

                <p className="flex gap-2">
                  Season: <Accent>{anime.season}</Accent>
                </p>

                <p className="flex gap-2">
                  Popularity: <Accent>{anime.popularity}</Accent>
                </p>

                <p className="flex gap-2">
                  Genres:{" "}
                  <Accent>
                    {anime.genres.map((studios, index) => (
                      <Badge key={index}>{studios}</Badge>
                    ))}
                  </Accent>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="flex flex-wrap items-center gap-1 font-bold text-foreground">
      {children}
    </span>
  );
}
