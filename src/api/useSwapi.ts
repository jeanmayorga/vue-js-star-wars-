import axios from "axios";
import type { Method } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached: any = {};

interface Props {
  page?: number;
  search?: string;
  method?: Method;
  path?:
    | ""
    | "people"
    | "planets"
    | "films"
    | "species"
    | "vehicles"
    | "starships";
  id?: string;
}

export async function useSwapi({
  page = undefined,
  search = undefined,
  path = "",
  method = "GET",
  id = "",
}: Props) {
  try {
    const hash = `${method}/${path}/${id}/${page || ""}/${search || ""}`;

    console.log(cached);

    if (cached[hash]) {
      return {
        data: cached[hash],
        error: false,
      };
    }

    const { data } = await axios.request({
      url: `https://swapi.dev/api/${path}/${id}`,
      method,
      params: { page, search },
    });

    cached[hash] = data;

    return {
      data,
      error: false,
    };
  } catch (error) {
    console.error(`Error fetching data from swapi: ${error}`);
    return {
      data: null,
      error: true,
    };
  }
}
