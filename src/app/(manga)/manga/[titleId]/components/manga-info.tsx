"use client";
import { Badge } from "@/components/ui/badge";
import { getChapters, getInfo } from "@/lib/manga";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ReactNode, use, useEffect, useState } from "react";
import { type Manga } from "mangadex-full-api";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";

export function MangaInfo({ id }: { id: string }) {
  const { data: mangaInfo, isLoading: mangaInfoLoading } = useQuery({
    queryKey: ["info", id],
    queryFn: () => getInfo(id),
    staleTime: 1000 * 60,
  });

  const { data: mangaChapters, isLoading: mangaChaptersLoading } = useQuery({
    queryKey: ["chapters", mangaInfo?.id],
    queryFn: () => getChapters(mangaInfo?.id ?? ""),
    staleTime: 1000 * 60,
  });

  const imageUrl = `https://uploads.mangadex.org/covers/${mangaInfo?.id}/${mangaInfo?.mainCoverResolved.fileName}.256.jpg`;
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(imageUrl)}`;

  if (mangaInfoLoading || mangaChaptersLoading)
    return (
      <div className="flex w-full py-20 h-full justify-center items-center">
        <ImSpinner2 className="animate-spin text-muted-foreground" size={50} />
      </div>
    );

  return (
    <div className="flex flex-col w-full">
      {mangaInfo && (
        <div className="relative flex w-full flex-col h-fit justify-start gap-4 rounded overflow-hidden items-left">
          <div className="inset-0 absolute -z-10  w-full h-[400px] flex justify-center items-start">
            <Image
              src={proxyUrl || "/cover.jpg"}
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
                  src={proxyUrl || "/cover.jpg"}
                  width={300}
                  height={400}
                  alt=""
                  className="object-cover shadow-xl hover:scale-110 h-full ease-in-out duration-200"
                />
              </div>
            </div>

            <div className="flex flex-col w-full">
              <p className="text-4xl tracking-tight font-extrabold text-left">
                {mangaInfo.title.en}
              </p>
              <p className="text-xl mb-2 tracking-tight text-muted-foreground italic text-left">
                {mangaInfo.altTitles.find((title) => title.jp)?.en}
              </p>

              <p className="text-md mb-10 h-fit overflow-scroll tracking-tight text-muted-foreground text-left">
                {mangaInfo.description.en}
              </p>

              <p className="flex gap-2">
                <Accent>
                  {mangaInfo.tags.map((tag, index) => (
                    <Badge key={index}>{tag.name.en}</Badge>
                  ))}
                </Accent>
              </p>

              {/* <div className="grid text-muted-foreground grid-cols-2">
                <div>
                  <p className="flex gap-2">
                    Type: <Accent>{mangaInfo.format}</Accent>
                  </p>

                  <p className="flex gap-2">
                    Year: <Accent>{mangaInfo.year}</Accent>
                  </p>

                  <p className="flex gap-2">
                    Status: <Accent>{mangaInfo.status}</Accent>
                  </p>

                  <p className="flex gap-2">
                    Rating:
                    <Accent>
                      <Star size={15} color="#ebe534" />
                      {mangaInfo.score.decimalScore}
                    </Accent>
                  </p>

                  <p className="flex gap-2">
                    Studios:{" "}
                    <Accent>
                      {mangaInfo.studios.map((studios, index) => (
                        <Badge key={index}>{studios.name}</Badge>
                      ))}
                    </Accent>
                  </p>
                </div>

                <div>
                  <p className="flex gap-2">
                    Episodes: <Accent>{mangaInfo.episodes}</Accent>
                  </p>

                  <p className="flex gap-2">
                    Duration: <Accent>{mangaInfo.duration}</Accent>
                  </p>

                  <p className="flex gap-2">
                    Season: <Accent>{mangaInfo.season}</Accent>
                  </p>

                  <p className="flex gap-2">
                    Popularity: <Accent>{mangaInfo.popularity}</Accent>
                  </p>

                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2 w-full h-[700px]">
        <div className="border flex flex-col w-full rounded p-5">
          <h1 className="text-2xl font-bold mb-2 text-left">Chapters</h1>
          <div className="flex flex-col overflow-scroll gap-1 h-full">
            <Command className="border">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList className="max-h-full asdfg">
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Chapters">
                  {mangaChapters?.map((chapter, index) => (
                    <Link
                      className="flex flex-col"
                      href={`/chapter/${chapter.id}`}
                      key={index}
                    >
                      <CommandItem className="flex cursor-pointer mb-2 w-full items-start hover:bg-secondary flex-col">
                        <span>{`Chapter ${chapter.chapter}`}</span>
                        <span className="text-xs text-muted-foreground">
                          {chapter.title}
                        </span>
                      </CommandItem>
                    </Link>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
        <div className="border flex w-[400px] rounded p-5">
          <h1 className="text-2xl font-bold text-center">Related</h1>
        </div>
      </div>
    </div>
  );
}

function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="flex flex-wrap items-center gap-1 font-bold text-foreground">
      {children}
    </span>
  );
}
