const url = process.env.NEXT_PUBLIC_AMVSTRM_API;
import axios, { AxiosError } from "axios";

export async function getPopular(limit: number = 20) {
  try {
    const { data } = await axios.get(`${url}/popular?limit=${limit}`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}
