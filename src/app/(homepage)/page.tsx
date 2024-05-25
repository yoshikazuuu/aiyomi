import { ModeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowBigDown, ArrowDown } from "lucide-react";
import Link from "next/link";
import {
  PiBookFill,
  PiImageFill,
  PiTelevisionFill,
  PiTelevisionSimpleFill,
} from "react-icons/pi";
import { INewsFeed, NEWS, Topics } from "@consumet/extensions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const ann = new NEWS.ANN();

export default async function Home() {
  const news = await ann.fetchNewsFeeds();

  return (
    <div className="container w-screen justify-center items-center gap-2">
      <div className="absolute -z-10 -mt-[100px] h-screen w-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-400/30 via-red-50/0 transition-colors dark:from-teal-600/30 dark:via-red-50/0" />

      <section className="flex flex-col items-center min-h-[calc(100dvh-10rem)] justify-center gap-4">
        <p className="text-balance w-[102%] bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-center text-8xl font-extrabold tracking-tighter text-transparent  dark:bg-gradient-to-r dark:from-teal-400 dark:to-yellow-200">
          Your one stop entertainments solution.
        </p>
        <p className="text-muted-foreground text-lg text-center w-7/12">
          Your Gateway to{" "}
          <span className="font-bold text-foreground">Anime</span>,{" "}
          <span className="font-bold text-foreground">Manga</span>, and{" "}
          <span className="font-bold text-foreground">Light Novels</span>{" "}
          Explore an extensive collection of your favorite series with a
          seamless reading and watching experience.
        </p>
        <div className="flex items-center gap-2">
          <Link href="/anime" prefetch>
            <Button className="gap-1 flex">
              <PiTelevisionFill />
              Anime
            </Button>
          </Link>
          <Link href="/manga" prefetch>
            <Button className="gap-1 flex">
              <PiImageFill />
              Manga
            </Button>
          </Link>
          <Link href="/ln" prefetch>
            <Button className="gap-1 flex">
              <PiBookFill />
              Light Novels
            </Button>
          </Link>
        </div>
      </section>

      <a
        href="#news"
        className="flex items-center justify-center w-full hover:text-primary ease-in-out duration-300 cursor-pointer scale-100 hover:scale-125"
      >
        <ArrowDown size={50} className="animate-bounce" />
      </a>

      <section
        id="news"
        className="flex flex-col items-center min-h-screen pt-20 justify-start gap-4"
      >
        <h1 className="font-extrabold text-3xl self-start tracking-tight">
          News
        </h1>

        <div className="grid grid-cols-3 w-full gap-4">
          {news
            .filter((data) => data.topics.includes(Topics.ANIME))
            .map((data, i) => (
              <NewsCard data={data} key={i} />
            ))}
        </div>
      </section>
    </div>
  );
}

function NewsCard({ data }: { data: INewsFeed }) {
  return (
    <Link href={data.url} target="_blank">
      <Card className="group scale-100 hover:scale-[1.03] h-full w-full ease-out duration-100 active:scale-[0.98]">
        <div className="relative">
          <Image
            alt="Product"
            className="object-cover group-hover:opacity-70 duration-200 opacity-100 ease-in-out w-full aspect-[80/48] rounded-t-lg"
            height={500}
            style={{ objectFit: "cover" }}
            src={data.thumbnail}
            width={400}
          />
        </div>

        <CardHeader className="grid gap-1 p-4">
          <CardTitle>{data.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2 px-4 text-muted-foreground flex-wrap">
          {data.uploadedAt}
          <div className="flex flex-wrap">
            {data.topics.map((topic, i) => (
              <Badge key={i} variant="secondary" className="mr-2">
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
