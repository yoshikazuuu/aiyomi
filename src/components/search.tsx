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
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";

import { ANIME, IAnimeResult } from "@consumet/extensions";
import axios from "axios";
import { getSearch } from "@/lib/consumet";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { useState, useRef, useEffect, useCallback, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { getSearchResult } from "@/lib/amvstrm";
import { AnimeData } from "@/lib/types";

export function SearchNavbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AnimeData[]>([]);
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
    queryFn: () => getSearchResult(query),
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (data && Array.isArray(data.results)) {
      setResults(data.results);
    } else {
      setResults([]);
    }
  }, [data]);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

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
        Search your favorite anime here...
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
          {isLoading ? (
            <CommandEmpty>Loading...</CommandEmpty>
          ) : results.length > 0 ? (
            results.map((anime, index) => (
              <CommandItem
                onSelect={() => {
                  runCommand(() => router.push(`/anime/${anime.id}`));
                }}
                key={index}
                className="text-foreground"
              >
                <Image
                  src={anime.coverImage.medium}
                  alt={anime.title.english}
                  width={50}
                  height={70}
                  className="rounded"
                />
                <div className="flex gap-2 px-5 flex-col">
                  <span className="text-foreground font-bold text-lg">
                    {anime.title.english}
                  </span>
                  <Badge className="text-background w-fit">
                    {anime.seasonYear}
                  </Badge>
                </div>
              </CommandItem>
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
