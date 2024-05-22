const url = process.env.NEXT_PUBLIC_AMVSTRM_API;
import axios, { AxiosError } from "axios";
import {
  AnimeDefaultData,
  AnimeEpisodes,
  AnimeInfo,
  AnimeSearchResult,
} from "./types";

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

export async function getSearchResult(query: string) {
  try {
    const { data } = await axios.get(`${url}/search?limit=20&q=${query}`);
    return data as AnimeSearchResult;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}
