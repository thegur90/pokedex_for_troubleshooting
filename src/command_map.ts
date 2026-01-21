import type { State } from "./state.js";

function inferFetchURL(page: number): string {
  const baseURL = "https://pokeapi.co/api/v2/location-area/";
  const limit = 20;
  const offset = page * 20;
  return baseURL + `?offset=${offset}&limit=${limit}`;
}

export async function commandMap(s: State): Promise<void> {
  const n = s.nextLocationsURL ?? undefined;
  const data = await s.pokeapi.fetchLocations(n);

  for (const location_area of data.results) {
    console.log(location_area.name);
  }

  s.nextLocationsURL = data.next;
  s.prevLocationsURL = data.previous;
}

export async function commandMapb(s: State): Promise<void> {
  if (!s.prevLocationsURL) {
    console.log("you're on the first page");
    return;
  }
  const n = s.prevLocationsURL ?? undefined;
  const data = await s.pokeapi.fetchLocations(n);

  for (const location_area of data.results) {
    console.log(location_area.name);
  }

  s.nextLocationsURL = data.next;
  s.prevLocationsURL = data.previous;
}
