"use client";

import { useEffect, useState } from "react";
import { Tabs } from "./tabs";
import { AnimeDefaultData, Result } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getAnimeWithType, getTrending } from "@/lib/amvstrm";
import { AnimeCard } from "./card";

interface SelectionAnime {
  trendingAnime: AnimeDefaultData;
  topAnime: AnimeDefaultData;
  popularAnime: AnimeDefaultData;
}

export function Selection({ data: anime }: { data: SelectionAnime }) {
  const [activeTab, setActiveTab] = useState("ID_DESC");

  const bruh = useQuery({
    queryKey: ["trending"],
    queryFn: () => getTrending(),
    staleTime: 1000 * 60,
  });

  const data = useQuery({
    queryKey: ["search", activeTab],
    queryFn: () => getAnimeWithType(activeTab),
    staleTime: 1000 * 60,
  });

  return (
    <>
      <Tabs setActiveTab={setActiveTab} />

      <section className="grid w-full gap-10 my-3 grid-cols-6">
        {activeTab === "ID_DESC" && (
          <>
            {anime.trendingAnime.results.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </>
        )}
        {activeTab === "POPULARITY_DESC" && (
          <>
            {anime.popularAnime.results.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </>
        )}
        {activeTab === "SCORE_DESC" && (
          <>
            {anime.topAnime.results.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </>
        )}
      </section>
    </>
  );
}
