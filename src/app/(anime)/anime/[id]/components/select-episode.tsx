"use client";

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
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { AnimeEpisodes, Episode } from "@/lib/types";
import { useState } from "react";
import { IAnimeEpisode, IAnimeInfo } from "@consumet/extensions";

export function ComboboxPopover({
  episodes,
  selectedEpisode,
  setselectedEpisode,
}: {
  episodes?: IAnimeInfo;
  selectedEpisode: IAnimeEpisode | null;
  setselectedEpisode: (episode: IAnimeEpisode | null) => void;
}) {
  const [open, setOpen] = useState(false);

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
            {selectedEpisode ? (
              <>Episode {selectedEpisode.number}</>
            ) : (
              <>Select Episode</>
            )}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="center">
          <Command>
            <CommandInput placeholder="Type episode number" />
            <CommandList>
              <CommandEmpty>
                <p>No results found.</p>
                <p className="text-muted-foreground text-xs">
                  Try typing: 1, 2, or 10
                </p>
              </CommandEmpty>
              <CommandGroup>
                {episodes?.episodes?.map((episode) => (
                  <CommandItem
                    key={episode.number}
                    value={episode.number.toString()}
                    onSelect={(value) => {
                      setselectedEpisode(
                        episodes?.episodes?.find(
                          (priority) => priority.number.toString() === value
                        ) || null
                      );
                      setOpen(false);
                    }}
                  >
                    <a>Episode {episode.number}</a>
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
