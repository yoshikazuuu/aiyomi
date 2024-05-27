const url = process.env.NEXT_PUBLIC_CONSUMET_API;
import axios, { AxiosError } from "axios";

import { Chapter, Manga } from "mangadex-full-api";
import { IMangaInfo, IMangaResult, ISearch, MANGA } from "@consumet/extensions";

const provider = "mangadex";

export async function getSearch(query: string) {
  try {
    const data = await Manga.search({
      title: query,
      limit: 10,
      hasAvailableChapters: true,
      includes: ["cover_art"],
    });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}
export async function getInfo(id: string) {
  try {
    const data = await Manga.get(id);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}

export async function getChapters(manga: Manga | null) {
  try {
    if (!manga) {
      return null;
    }

    const chapters = await manga.getFeed({
      limit: 500,
      translatedLanguage: ["en"],
      order: {
        createdAt: "desc",
      },
      includes: ["manga"],
    });

    const latestChapters = chapters.reduce((acc, current) => {
      const chapterName = current.chapter ?? "";

      if (
        !acc.hasOwnProperty(chapterName) ||
        new Date(acc[chapterName].updatedAt) < new Date(current.updatedAt)
      ) {
        acc[chapterName] = current;
      }

      return acc;
    }, {} as Record<string, (typeof chapters)[0]>);

    const result = Object.values(latestChapters);

    result.sort((a, b) => {
      const [aMain, aFraction = "0"] = a.chapter?.split(".").map(Number) ?? [];
      const [bMain, bFraction = "0"] = b.chapter?.split(".").map(Number) ?? [];

      if (aMain !== bMain) {
        return bMain - aMain;
      }
      return Number(bFraction) - Number(aFraction);
    });

    return result;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}

export async function getChapter(chapterId: string) {
  try {
    const chapter = await Chapter.get(chapterId);
    const pages = await chapter.getReadablePages();
    return { chapter, pages };
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}
