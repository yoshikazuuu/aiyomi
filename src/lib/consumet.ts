import { IAnimeResult, ISearch } from "@consumet/extensions";
import axios, { AxiosError } from "axios";
import { anime } from "./anime";
const url = process.env.NEXT_PUBLIC_CONSUMET_API;

export async function getSearch(query: string) {
  try {
    const { data } = await axios.get(`${url}/anime/gogoanime/${query}`);
    return data as Promise<ISearch<IAnimeResult>>;
  } catch (err) {
    const axiosErr = err as AxiosError;
    throw new Error(axiosErr.message);
  }
}
