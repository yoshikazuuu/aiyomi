const url = process.env.NEXT_PUBLIC_AMVSTRM_API;
const url_consumet = process.env.NEXT_PUBLIC_CONSUMET_API;
import axios, { AxiosError } from "axios";
import {
  AnimeDefaultData,
  AnimeEpisodes,
  AnimeInfo,
  AnimeSearchResult,
  Result,
} from "./types";

import { IAnimeInfo, IAnimeResult, ISource } from "@consumet/extensions";

export async function getPopular(limit: number = 20) {
  try {
    const { data } = await axios.get(`${url}/popular?limit=${limit}`);
    return data as AnimeDefaultData;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}

export async function getTrending(limit: number = 20) {
  try {
    const { data } = await axios.get(`${url}/trending?limit=${limit}`);
    return data as AnimeDefaultData;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}

export async function getAnimeWithType(activeTab: string) {
  try {
    const { data } = await axios.post(`${url}/search`, {
      sort: [activeTab],
      size: 20,
      format: "TV",
    });

    return data as AnimeDefaultData;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}

export async function getAnimeInfo(id: string) {
  try {
    const { data } = await axios.get(`${url}/info/${id}`);
    return data as AnimeInfo;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}

export async function getAnimeEpisodes(id: string) {
  try {
    const { data } = await axios.get(`${url}/episode/${id}`);
    return data as AnimeEpisodes;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}

export async function getAnimeRecommendation(id: string) {
  try {
    const { data } = await axios.get(`${url}/recommendations/${id}`);
    return data.results as Result[];
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}

export async function getEpisodeSource(id: string) {
  try {
    const { data } = await axios.get(
      `${url_consumet}/anime/gogoanime/watch/${id}`
    );
    return data as ISource;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}

export async function getAnimeInfoGogo(idGogo: string) {
  try {
    const { data } = await axios.get(
      `${url_consumet}/anime/gogoanime/info/${idGogo}`
    );
    return data as IAnimeInfo;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}

export async function getAllEpisodeSource(episode: AnimeEpisodes) {
  try {
    const data = await Promise.all(
      episode.episodes.map((episode) =>
        axios.get(`${url_consumet}/anime/gogoanime/watch/${episode.id}`)
      )
    );
    return data.map((res) => res.data) as ISource[];
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}

export async function getSearchResult(query: string) {
  try {
    const { data } = await axios.get(`${url}/search?limit=20&q=${query}`);
    return data as AnimeSearchResult;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}
