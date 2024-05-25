"use client";
import "./player-styles.css";

import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  PlyrLayout,
  plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";
import { forwardRef, Ref, Suspense, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getAnimeEpisodes,
  getAnimeInfoGogo,
  getEpisodeSource,
} from "@/lib/api";
import { ComboboxPopover } from "./select-episode";
import { Episode } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

import {
  DefaultAudioLayout,
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { IAnimeEpisode } from "@consumet/extensions";

export function Player({
  gogoId,
  bannerImage,
}: {
  gogoId: string;
  bannerImage: string;
}) {
  const [selectedEpisode, setselectedEpisode] = useState<IAnimeEpisode | null>({
    id: "",
    number: 1,
  });

  const { data: gogoInfo, isLoading: gogoInfoLoading } = useQuery({
    queryKey: ["gogoInfo", gogoId],
    queryFn: () => getAnimeInfoGogo(gogoId),
    staleTime: 1000 * 60,
  });

  const selectedEpisodeNumber = selectedEpisode?.number ?? 0;
  const selected = gogoInfo?.episodes?.find(
    (episode) => episode.number === selectedEpisodeNumber
  );
  const selectedEpisodeId = selected?.id ?? "";

  const { data: episodeSource, isLoading: episodeSourceLoading } = useQuery({
    queryKey: ["episodeSource", selectedEpisodeId],
    queryFn: () => getEpisodeSource(selectedEpisodeId),
    staleTime: 1000 * 60,
    enabled: !!selectedEpisodeId, // Ensure this only runs when selectedEpisodeId is valid
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
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episodeSourceLoading]);

  // if (!episodeSource && !episodeSourceLoading) {
  //   return <></>;
  // }

  return (
    <div className="flex gap-4 w-full">
      {gogoInfoLoading ? (
        <Skeleton className="aspect-video mb-[0.4rem] w-full h-full rounded-xl" />
      ) : (
        <div className="h-fit w-full" ref={videoPlayerContainerRef}>
          <MediaPlayer
            title={selectedEpisodeId}
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
          selectedEpisode={selectedEpisode}
          setselectedEpisode={setselectedEpisode}
          episodes={gogoInfo}
        />
        <div className="max-w-[200px] space-y-2 grow overflow-hidden border rounded p-4">
          <p className="text-xs text-muted-foreground font-bold">
            Available Episode
          </p>

          <div className="h-full overflow-scroll">
            <ul className="overflow-scroll">
              {gogoInfo?.episodes?.map((episode, index) => (
                <li
                  className="hover:bg-secondary px-3 py-1 cursor-pointer text-muted-foreground"
                  key={index}
                  onClick={() =>
                    setselectedEpisode(
                      gogoInfo?.episodes?.find(
                        (priority) => priority.number === episode.number
                      ) || null
                    )
                  }
                >
                  <a>Episode {episode.number}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
