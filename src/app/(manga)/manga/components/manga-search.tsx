"use client";

import {
  Calculator,
  Calendar,
  CreditCard,
  Search,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command-notsearch";
import { Button } from "../../../../components/ui/button";
import { useQuery } from "@tanstack/react-query";

import Image from "next/image";
import { Badge } from "../../../../components/ui/badge";
import { useState, useRef, useEffect, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { getSearchResult } from "@/lib/anime";
import { AnimeData } from "@/lib/types";
import Link from "next/link";
import { getSearch } from "@/lib/manga";
import { IMangaResult } from "@consumet/extensions";
import { type Manga } from "mangadex-full-api";

export function MangaSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => getSearch(query),
    staleTime: 1000 * 60,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetQuery = useCallback(
    debounce((value) => setQuery(value), 210),
    []
  );

  const handleInputChange = useCallback(() => {
    if (ref.current?.value) {
      debouncedSetQuery(ref.current.value);
    }
  }, [debouncedSetQuery]);

  return (
    <>
      <Button
        variant="outline"
        className="rounded-full flex w-fit gap-3 h-[60%] text-sm text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <Search size={15} />
        Search your favorite manga here...
        <Keys>
          <span className="text-xs">⌘</span>K
        </Keys>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          ref={ref}
          onChangeCapture={handleInputChange}
        />
        <CommandList className="p-2 flex-1">
          {isLoading || data == null ? (
            <CommandEmpty>Loading...</CommandEmpty>
          ) : data?.length > 0 ? (
            data?.map((manga, index: number) => (
              <Card setOpen={setOpen} manga={manga} key={index} />
            ))
          ) : (
            <CommandEmpty>
              No results found... <br />{" "}
              <span className="font-bold italic">
                Start type your favorite anime!
              </span>
            </CommandEmpty>
          )}
        </CommandList>
        <div className="border-t bg-primary/20 text-sm p-1">
          <Keys>↑</Keys> <Keys>↓</Keys> to navigate and <Keys>↵</Keys> to select
        </div>
      </CommandDialog>
    </>
  );
}

function Keys({ children }: { children: ReactNode }) {
  return (
    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
      {children}
    </kbd>
  );
}

function Card({
  manga,
  setOpen,
}: {
  manga: Manga;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [cover, setCover] = useState<string | null>(null);
  const [authors, setAuthors] = useState<string | null>(null);

  if (
    manga &&
    manga.mainCover &&
    typeof manga.mainCover.resolve === "function"
  ) {
    manga.mainCover.resolve().then((data) => {
      setCover(data.fileName); // Set the cover image file name when promise resolves
    });
  }

  if (
    manga &&
    manga.authors[0] &&
    typeof manga.authors[0].resolve === "function"
  ) {
    manga.authors[0].resolve().then((data) => {
      setAuthors(data.name); // Set the cover image file name when promise resolves
    });
  }

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Link
      onClick={() => {
        runCommand(() => {});
      }}
      href={`/manga/${manga.id}`}
      prefetch
    >
      <CommandItem className="text-foreground cursor-pointer">
        <Image
          src={`https://uploads.mangadex.org/covers/${manga.id}/${cover}.256.jpg`}
          alt={manga.title.toString()}
          width={50}
          height={70}
          className="rounded"
        />
        <div className="flex gap-2 px-5 flex-col">
          <span className="text-foreground font-bold text-lg">
            {manga.title.en ||
              manga.altTitles.find((title) => title.en)?.localString ||
              manga.altTitles.find((title) => title.jp)?.localString ||
              "alo"}
          </span>
          <Badge className="text-background w-fit">{authors}</Badge>
        </div>
      </CommandItem>
    </Link>
  );
}
