"use client";
import {
  getAllEpisodeSource,
  getAnimeEpisodes,
  getAnimeInfo,
  getEpisodeSource,
} from "@/lib/amvstrm";
import { AnimeEpisodes, AnimeInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Player } from "./player";
import { ISource } from "@consumet/extensions";
import { ep, es } from "@vidstack/react/types/vidstack-react.js";

import { Skeleton } from "@/components/ui/skeleton";

export function WatchAnimeWithInfo({ id }: { id: string }) {
  const { data: animeInfo, isLoading: animeInfoLoading } = useQuery({
    queryKey: ["info", id],
    queryFn: () => getAnimeInfo(id),
    staleTime: 1000 * 60,
  });

  return (
    <>
      <Player id={id} />
      <div>
        {animeInfoLoading ? (
          <p>Loading info...</p>
        ) : (
          animeInfo && <AnimeDetails animeInfo={animeInfo} />
        )}
      </div>
    </>
  );
}

function AnimeDetails({ animeInfo }: { animeInfo: AnimeInfo }) {
  return (
    <>
      <h1>{animeInfo.title.userPreferred}</h1>
      <p>{animeInfo.description}</p>
    </>
  );
}

function Episodes({
  episodes,
  setEpisode,
}: {
  episodes: AnimeEpisodes;
  setEpisode: (episode: number) => void;
}) {
  return (
    <ul>
      {episodes.episodes.map((episode, index) => (
        <li key={index}>
          <a onClick={() => setEpisode(episode.episode)}>{episode.title}</a>
        </li>
      ))}
    </ul>
  );
}
