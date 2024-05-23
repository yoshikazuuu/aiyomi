"use client";
import {
  getAllEpisodeSource,
  getAnimeEpisodes,
  getAnimeInfo,
  getEpisodeSource,
} from "@/lib/amvstrm";
import { AnimeEpisodes, AnimeInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import Link from "next/link";
import { Player } from "./components/player";
import { ISource } from "@consumet/extensions";
import { ep, es } from "@vidstack/react/types/vidstack-react.js";

export function WatchAnimeWithInfo({ id }: { id: string }) {
  const [episodeId, setEpisodeId] = useState(1);

  const { data: animeInfo, isLoading: animeInfoLoading } = useQuery({
    queryKey: ["info", id],
    queryFn: () => getAnimeInfo(id),
    staleTime: 1000 * 60,
  });

  const { data: episodes, isLoading: episodesLoading } = useQuery({
    queryKey: ["episodes", id],
    queryFn: () => getAnimeEpisodes(id),
    staleTime: 1000 * 60,
  });

  //   const { data: episodeSource, isLoading: episodeSourceLoading } = useQuery({
  //     queryKey: ["episodeSource", id],
  //     queryFn: () =>
  //       episodes && episodes.episodes.length > 0
  //         ? getAllEpisodeSource(episodes)
  //         : Promise.resolve([]),
  //     staleTime: 1000 * 60,
  //   });

  const { data: episodeSource, isLoading: episodeSourceLoading } = useQuery({
    queryKey: ["episodeSource", episodes?.episodes[episodeId - 1]?.id],
    queryFn: () =>
      getEpisodeSource(episodes?.episodes[episodeId - 1]?.id || ""),
    staleTime: 1000 * 60,
  });

  return (
    <>
      {episodeSourceLoading ? (
        <p>Loading source...</p>
      ) : (
        episodeSource && (
          <Player
            url={
              episodeSource.sources.find((src) => src.quality === "default")
                ?.url || ""
            }
          />
        )
      )}

      <div>
        {animeInfoLoading ? (
          <p>Loading info...</p>
        ) : (
          animeInfo && <AnimeDetails animeInfo={animeInfo} />
        )}
      </div>
      <div>
        <h1>Episodes</h1>

        {episodesLoading ? (
          <p>Loading episodes...</p>
        ) : (
          episodes && <Episodes episodes={episodes} setEpisode={setEpisodeId} />
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
