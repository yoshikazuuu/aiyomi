"use client";

import { getChapter, getChapters } from "@/lib/manga";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Chapter, Manga } from "mangadex-full-api";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ChapterEnhanced } from "@/lib/types";
import { ImSpinner2 } from "react-icons/im";

export function ReadChapter({ id }: { id: string }) {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["chapter", id],
    queryFn: () => getChapter(id),
  });

  const chapter = data?.chapter;
  const pages = data?.pages;
  const manga = chapter?.mangaResolved;
  const [aspectRatios, setAspectRatios] = useState<number[]>([]);
  const [selectedChapter, setSelectedChapter] = useState(chapter || null);

  const handleImageLoad = (index: number, event: any) => {
    const width = event.target.naturalWidth;
    const height = event.target.naturalHeight;
    const aspectRatio = width / height;
    setAspectRatios((prev) => {
      const newRatios = [...prev];
      newRatios[index] = aspectRatio;
      return newRatios;
    });
  };

  useEffect(() => {
    if (chapter) setSelectedChapter(chapter);
  }, [chapter]);

  useEffect(() => {
    if (selectedChapter?.id) {
      router.push(`/chapter/${selectedChapter.id}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChapter]);

  if (isLoading)
    return (
      <div className="flex w-full py-20 h-full justify-center items-center">
        <ImSpinner2 className="animate-spin text-muted-foreground" size={50} />
      </div>
    );

  return (
    <>
      <div className="container grid grid-cols-3 h-14 gap-4 place-items-center">
        <p className="font-extrabold truncate w-full">
          Chapter {chapter?.chapter}{" "}
          {chapter?.title ? `- ${chapter?.title}` : ``}
        </p>

        <Link href={`/manga/${manga?.id}`}>
          <Badge>{manga?.title.en}</Badge>
        </Link>

        <ChapterSelector
          manga={manga}
          selectedChapter={selectedChapter}
          setSelectedChapter={setSelectedChapter}
        />
      </div>
      {data && (
        <div className="flex justify-center items-center flex-col w-full">
          {pages?.map((page: any, index: number) => {
            const aspectRatio = aspectRatios[index];
            const isWidescreen = aspectRatio && aspectRatio > 1;
            const isManhwa = aspectRatio && aspectRatio < 0.5;
            console.log(index, aspectRatios[index]);

            return (
              <div
                className={cn(
                  `flex justify-center w-full h-full`,
                  !isWidescreen
                    ? isManhwa
                      ? "max-w-lg h-fit"
                      : "max-h-screen"
                    : "min-w-full max-h-screen"
                )}
                key={index}
              >
                <Image
                  className="object-contain"
                  width={1920}
                  height={1080}
                  alt=""
                  src={page}
                  onLoad={(event) => handleImageLoad(index, event)}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

function ChapterSelector({
  manga,
  selectedChapter,
  setSelectedChapter,
}: {
  manga: Manga | undefined;
  selectedChapter: ChapterEnhanced | null;
  setSelectedChapter: (chapter: ChapterEnhanced | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const { data: mangaChapters, isLoading: mangaChaptersLoading } = useQuery({
    queryKey: ["chapters", manga?.id],
    queryFn: () => getChapters(manga?.id ?? ""),
    staleTime: 1000 * 60,
  });

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectedChapter ? (
              <>Chapter {selectedChapter.chapter}</>
            ) : (
              <>Select Chapter</>
            )}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="center">
          <Command className="border">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList className="max-h-[500px]">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Chapters">
                {mangaChapters?.map((chapter, index) => (
                  <CommandItem
                    key={index}
                    className="flex cursor-pointer mb-2 w-full items-start hover:bg-secondary flex-col"
                    onSelect={(value) => {
                      setSelectedChapter(
                        (mangaChapters.find(
                          (priority) =>
                            `Chapter ${
                              priority.chapter + (priority.title ?? "")
                            }` === value
                        ) as ChapterEnhanced) || null
                      );
                      setOpen(false);
                    }}
                  >
                    <span>{`Chapter ${chapter.chapter}`}</span>
                    <span className="text-xs text-muted-foreground">
                      {chapter.title}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
