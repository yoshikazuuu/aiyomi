import { IAnimeResult, ISearch } from "@consumet/extensions";
import axios, { AxiosError } from "axios";
import { anime } from "./anime";
const url = process.env.NEXT_PUBLIC_CONSUMET_API;

export async function getRecentEpisode() {
  try {
    return await anime.fetchRecentEpisodes();
  } catch (err) {
    const axiosErr = err as AxiosError;
    throw new Error(axiosErr.message);
  }
}
