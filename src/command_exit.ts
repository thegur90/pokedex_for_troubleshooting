import type { State } from "./state.js";
export function commandExit(s: State): void {
  console.log("Closing the Pokedex... Goodbye!");
  s.rl.close();
  process.exit(0);
}
