type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(k: string, v: T): void {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: v,
    };
    this.#cache.set(k, entry);
  }

  get<T>(k: string): T | undefined {
    const entry = this.#cache.get(k);
    if (entry) {
      return entry.val;
    }
    return undefined;
  }

  #reap(): void {
    const Limit: number = Date.now() - this.#interval;
    for (const [key, entry] of this.#cache.entries()) {
      if (entry.createdAt <= Limit) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop(): void {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  stopReapLoop(): void {
    if (this.#reapIntervalId !== undefined) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }
}
