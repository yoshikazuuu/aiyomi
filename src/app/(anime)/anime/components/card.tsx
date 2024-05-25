"use client";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Smile } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimeInfo, Result } from "@/lib/types";
import Link from "next/link";

export function AnimeCard({ anime }: { anime: Result | AnimeInfo }) {
  let color: string = "#000000";
  if ("averageScore" in anime) {
    color = getColor(anime.averageScore);
  }

  let airingNotification = "";
  if ("nextAiringEpisode" in anime) {
    airingNotification = getAiringNotification(
      anime.nextAiringEpisode?.airingAt,
      anime.nextAiringEpisode?.episode
    );
  }

  const badgeColor = getContrastColor(anime.coverImage.color);
  const pastelColor = getPastelColor(anime.coverImage.color);

  function getColor(value: number) {
    value = Math.max(0, Math.min(100, value));

    let red, green;

    if (value <= 50) {
      red = 255;
      green = Math.floor((value / 50) * 255);
    } else {
      red = Math.floor(((100 - value) / 50) * 255);
      green = 255;
    }

    return `rgb(${red}, ${green}, 0)`;
  }

  function getAiringNotification(airingAt: number, episode: number) {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilAiring = airingAt - currentTime;
    const daysUntilAiring = Math.floor(timeUntilAiring / (60 * 60 * 24));
    return `Ep ${episode} airing in ${daysUntilAiring} days`;
  }

  function getLuminance(color: string) {
    if (!color) {
      return 0;
    }

    const hex = color.replace("#", "");
    const rgb = parseInt(hex, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return l;
  }

  function blendColors(color1: string, color2: string, weight: number) {
    const d2h = (d: number) => d.toString(16).padStart(2, "0");
    const h2d = (h: string) => parseInt(h, 16);

    let color = "#";
    for (let i = 0; i <= 4; i += 2) {
      const v1 = h2d(color1.slice(1 + i, 3 + i));
      const v2 = h2d(color2.slice(1 + i, 3 + i));
      const val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)));
      color += val;
    }
    return color;
  }

  function getContrastColor(backgroundColor: string) {
    const luminance = getLuminance(backgroundColor);
    if (luminance > 128) {
      return blendColors(backgroundColor, "#000000", 30);
    } else {
      return "#FFFFFF";
    }
  }

  function getPastelColor(color: string) {
    if (!color) {
      return blendColors("#000000", "#ffffff", 50);
    }
    return blendColors(color, "#ffffff", 70);
  }

  return (
    <HoverCard closeDelay={0} openDelay={0}>
      <HoverCardTrigger asChild>
        <Link
          href={
            anime.format === "TV" ||
            anime.format === "MOVIE" ||
            anime.format === "OVA" ||
            anime.format === "ONA"
              ? `/anime/${anime.id}`
              : `https://anilist.co/${anime.format.toLowerCase()}/${anime.id}`
          }
          prefetch
          passHref
        >
          <div className="relative flex flex-col group col rounded-xl gap-4">
            <div className="rounded aspect-[3/4.5] shadow-lg overflow-hidden">
              <Image
                src={anime.coverImage.large}
                width={150}
                height={200}
                alt=""
                className="group-hover:scale-110 scale-100 h-full w-full ease-in-out duration-200 object-cover"
              />
            </div>
            <div className="relative font-bold text-sm group">
              <p className="leading-5 group-hover:invisible line-clamp-2">
                {anime.title.userPreferred}
              </p>
              <p
                className="absolute top-0 -z-10 leading-5 line-clamp-2"
                style={{ color: anime.coverImage.color }}
              >
                {anime.title.userPreferred}
              </p>
            </div>
          </div>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        hideWhenDetached
        className="max-w-md flex flex-col gap-4 dark:bg-accent min-w-72 shadow-lg"
      >
        <div className="flex font-medium justify-between">
          {"nextAiringEpisode" in anime ? (
            <span>{airingNotification}</span>
          ) : (
            "seasonYear" in anime && (
              <span className="capitalize">{`${anime.season.toLowerCase()} ${
                anime.seasonYear
              }`}</span>
            )
          )}
          <span className="flex items-center gap-1">
            <Smile size={20} style={{ color }} />
            {"averageScore" in anime ? `${anime.averageScore}%` : ""}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <p
            className="font-extrabold text-sm"
            style={{
              color: pastelColor,
            }}
          >
            {anime.status}
          </p>

          <p className="font-bold text-sm text-muted-foreground">
            {anime.format} • {anime.episodes} episode
          </p>
        </div>

        <div>
          {anime.genres.map((genre, index) => (
            <Badge
              key={index}
              variant="secondary"
              style={{
                backgroundColor: pastelColor,
                color: badgeColor,
              }}
              className="mb-1 mr-2"
            >
              {genre}
            </Badge>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
