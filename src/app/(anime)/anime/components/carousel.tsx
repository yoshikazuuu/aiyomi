"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Trending from "@/app/(anime)/anime/components/trending";
import { ReactNode, useRef } from "react";

export function CarouselDApiDemo({ children }: { children: ReactNode }) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));

  return (
    <div>
      <Carousel
        opts={{ loop: true }}
        plugins={[plugin.current]}
        className="w-screen -mt-14 overflow-hidden relative"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
      >
        <CarouselContent>{children}</CarouselContent>
      </Carousel>
    </div>
  );
}
