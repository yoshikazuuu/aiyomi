const url_consumet = process.env.NEXT_PUBLIC_CONSUMET_API;
import axios, { AxiosError } from "axios";

import { Chapter, Manga } from "mangadex-full-api";
import { ChapterEnhanced, MangaEnhanced } from "./types";

export async function getSearch(query: string) {
  try {
    // const data = await Manga.search({
    //   title: query,
    //   limit: 10,
    //   hasAvailableChapters: true,
    //   includes: ["cover_art"],
    // });
    // return data;
    const { data } = await axios.get(`${url_consumet}/manga/mangadex/${query}`);
    return data as MangaEnhanced[];
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}
export async function getInfo(id: string) {
  try {
    // const data = await Manga.get(id);
    // return data;
    const { data } = await axios.get(
      `${url_consumet}/manga/mangadex/info/${id}`
    );
    return data as MangaEnhanced;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}

export async function getChapters(mangaId: string) {
  try {
    // if (!manga) {
    //   return null;
    // }
    // const chapters = await manga.getFeed({
    //   limit: 500,
    //   translatedLanguage: ["en"],
    //   order: {
    //     createdAt: "desc",
    //   },
    //   includes: ["manga"],
    // });
    // const latestChapters = chapters.reduce((acc, current) => {
    //   const chapterName = current.chapter ?? "";
    //   if (
    //     !acc.hasOwnProperty(chapterName) ||
    //     new Date(acc[chapterName].updatedAt) < new Date(current.updatedAt)
    //   ) {
    //     acc[chapterName] = current;
    //   }
    //   return acc;
    // }, {} as Record<string, (typeof chapters)[0]>);
    // const result = Object.values(latestChapters);
    // result.sort((a, b) => {
    //   const [aMain, aFraction = "0"] = a.chapter?.split(".").map(Number) ?? [];
    //   const [bMain, bFraction = "0"] = b.chapter?.split(".").map(Number) ?? [];
    //   if (aMain !== bMain) {
    //     return bMain - aMain;
    //   }
    //   return Number(bFraction) - Number(aFraction);
    // });
    // return result;
    const { data } = await axios.get(
      `${url_consumet}/manga/mangadex/read/${mangaId}`
    );
    return data as Chapter[];
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}

export async function getChapter(chapterId: string) {
  try {
    // const chapter = await Chapter.get(chapterId);
    // const pages = await chapter.getReadablePages();
    // return { chapter, pages };
    const { data } = await axios.get(
      `${url_consumet}/manga/mangadex/chapter/${chapterId}`
    );
    const { chapter, pages }: { chapter: ChapterEnhanced; pages: string[] } =
      data;
    return { chapter, pages };
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}
