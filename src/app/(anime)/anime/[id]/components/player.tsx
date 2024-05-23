"use client";
import "./player-styles.css";

import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  PlyrLayout,
  plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";
import { forwardRef, Ref, Suspense, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAnimeEpisodes, getEpisodeSource } from "@/lib/api";
import { ComboboxPopover } from "./select-episode";
import { Episode } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

export function Player({
  id,
  bannerImage,
}: {
  id: string;
  bannerImage: string;
}) {
  const [selectedStatus, setSelectedStatus] = useState<Episode | null>(null);

  const { data: episodes, isLoading: episodesLoading } = useQuery({
    queryKey: ["episodes", id],
    queryFn: () => getAnimeEpisodes(id),
    staleTime: 1000 * 60,
  });

  const { data: episodeSource, isLoading: episodeSourceLoading } = useQuery({
    queryKey: [
      "episodeSource",
      episodes?.episodes[
        selectedStatus?.episode ? selectedStatus?.episode - 1 : 0
      ]?.id,
    ],
    queryFn: () =>
      getEpisodeSource(
        episodes?.episodes[
          selectedStatus?.episode ? selectedStatus?.episode - 1 : 0
        ]?.id || ""
      ),
    staleTime: 1000 * 60,
  });

  const videoPlayerContainerRef = useRef<HTMLDivElement>(null);
  const [maxEpisodeListHeight, setMaxEpisodeListHeight] = useState("auto");
  const [rescale, setRescale] = useState(false);

  useEffect(() => {
    const updateMaxHeight = () => {
      if (videoPlayerContainerRef.current) {
        const height = videoPlayerContainerRef.current.offsetHeight;
        setMaxEpisodeListHeight(`${height}px`);
        console.log(height);
        setRescale(false);
      }
    };
    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);

    return () => window.removeEventListener("resize", updateMaxHeight);
  }, [rescale]);

  useEffect(() => {
    if (!episodeSourceLoading) {
      setRescale(true);
    }
    if (rescale) {
      setTimeout(() => {
        setRescale(false);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episodeSourceLoading]);

  if (!episodeSource && !episodeSourceLoading) {
    return <></>;
  }

  return (
    <div className="flex gap-4 w-full">
      {episodeSourceLoading ? (
        <Skeleton className="aspect-video mb-[0.4rem] w-full h-full rounded-xl" />
      ) : (
        <div className="flex-auto">
          <MediaPlayer
            title={
              episodes?.episodes[
                selectedStatus?.episode ? selectedStatus?.episode - 1 : 0
              ]?.id
            }
            src={
              episodeSource?.sources.find((src) => src.quality === "default")
                ?.url
            }
            aspectRatio="16/9"
            load="eager"
            posterLoad="eager"
            streamType="on-demand"
            storage="storage-key"
            keyTarget="player"
          >
            <MediaProvider>
              <Poster
                src={bannerImage}
                className="vds-poster"
                style={{ objectFit: "cover" }}
              ></Poster>
            </MediaProvider>
            {/* <PlyrLayout ref={videoPlayerContainerRef} icons={plyrLayoutIcons} /> */}
            <DefaultAudioLayout icons={defaultLayoutIcons} />
            <DefaultVideoLayout icons={defaultLayoutIcons} />
          </MediaPlayer>
        </div>
      )}

      <div
        className="flex flex-col max-w-[630px] max-h-[630px]  gap-4"
        style={{ maxHeight: maxEpisodeListHeight }}
      >
        <ComboboxPopover
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          episodes={episodes}
        />
        <div className="max-w-[200px] space-y-2 grow overflow-hidden border rounded p-4">
          <p className="text-xs text-muted-foreground font-bold">
            Available Episode
          </p>

          <div className="h-full overflow-scroll">
            <ul className="overflow-scroll">
              {episodes?.episodes.map((episode, index) => (
                <li
                  className="hover:bg-secondary px-3 py-1 cursor-pointer text-muted-foreground"
                  key={index}
                  onClick={() =>
                    setSelectedStatus(
                      episodes?.episodes.find(
                        (priority) => priority.title === episode.title
                      ) || null
                    )
                  }
                >
                  <a>{episode.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
