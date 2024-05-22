import { ModeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  PiBookFill,
  PiImageFill,
  PiTelevisionFill,
  PiTelevisionSimpleFill,
} from "react-icons/pi";

export default function Home() {
  return (
    <div className="flex space-y-20 container min-h-[calc(100dvh-3.6rem)] flex-col w-screen justify-center items-center gap-2">
      <div className="absolute -z-10 -mt-[56px] h-screen w-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-400/30 via-red-50/0 transition-colors dark:from-teal-600/30 dark:via-red-50/0" />
      <p className="text-balance w-[102%] bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-center text-8xl font-extrabold tracking-tighter text-transparent  dark:bg-gradient-to-r dark:from-teal-400 dark:to-yellow-200">
        Your one stop entertainments solution.
      </p>
      <p className="text-muted-foreground text-lg text-center w-7/12">
        Your Gateway to <span className="font-bold text-foreground">Anime</span>
        , <span className="font-bold text-foreground">Manga</span>, and{" "}
        <span className="font-bold text-foreground">Light Novels</span> Explore
        an extensive collection of your favorite series with a seamless reading
        and watching experience.
      </p>
      <div className="flex items-center gap-2">
        <Link href="/anime" prefetch>
          <Button className="gap-1 flex">
            <PiTelevisionFill />
            Anime
          </Button>
        </Link>
        <Link href="/anime" prefetch>
          <Button className="gap-1 flex">
            <PiImageFill />
            Manga
          </Button>
        </Link>
        <Link href="/anime" prefetch>
          <Button className="gap-1 flex">
            <PiBookFill />
            Light Novels
          </Button>
        </Link>
      </div>
    </div>
  );
}
