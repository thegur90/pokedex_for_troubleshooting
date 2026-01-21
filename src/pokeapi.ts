import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor(interval: number = 5000) {
    this.#cache = new Cache(interval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url =
      pageURL ?? `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`;

    const cached = this.#cache.get<ShallowLocations>(url);
    if (cached) {
      return cached;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch locations: ${res.status}`);
    }
    const data = (await res.json()) as ShallowLocations;
    this.#cache.add<ShallowLocations>(url, data);
    return data;
  }

  //async fetchLocation(locationName: string): Promise<Location> {
  // implement this
  //}
}

export type ShallowLocations = {
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export type Location = {
  // implement this
};
