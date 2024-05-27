const url = process.env.NEXT_PUBLIC_CONSUMET_API;
import axios, { AxiosError } from "axios";

import { Manga } from "mangadex-full-api";
import { IMangaInfo, IMangaResult, ISearch, MANGA } from "@consumet/extensions";
// const mangapill = new MANGA.MangaReader();

const provider = "mangadex";

export async function getSearch(query: string) {
  try {
    // const { data } = await axios.get(`${url}/manga/${provider}/${query}`);
    // return data as ISearch<IMangaResult>;
    const data = await Manga.search({
      title: query,
      limit: 10, // API Max is 100 per request, but this function accepts more
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
    // const { data } = await axios.get(`${url}/manga/${provider}/info?id=${id}`);
    // return data as Promise<IMangaInfo>;
    const data = await Manga.get(id);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}

export async function getChapters(manga: Manga | null) {
  try {
    // const { data } = await axios.get(`${url}/manga/${provider}/${query}`);
    // return data as ISearch<IMangaResult>;
    if (!manga) {
      return null;
    }

    const chapters = await manga.getFeed({
      limit: 500,
      translatedLanguage: ["en"],
      order: {
        createdAt: "desc",
      },
    });
    return chapters;
    const data = await Manga.getFeed;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}
