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

export function ComboboxPopover({
  episodes,
  selectedStatus,
  setSelectedStatus,
}: {
  episodes?: AnimeEpisodes;
  selectedStatus: Episode | null;
  setSelectedStatus: (episode: Episode | null) => void;
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
            {selectedStatus ? <>{selectedStatus.title}</> : <>Select Episode</>}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom" align="center">
          <Command>
            <CommandInput placeholder="Search episode" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {episodes?.episodes.map((episode) => (
                  <CommandItem
                    key={episode.episode}
                    value={episode.title}
                    onSelect={(value) => {
                      setSelectedStatus(
                        episodes?.episodes.find(
                          (priority) => priority.title === value
                        ) || null
                      );
                      setOpen(false);
                    }}
                  >
                    {episode.title}
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
