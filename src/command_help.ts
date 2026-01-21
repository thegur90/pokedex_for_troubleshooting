import type { CLICommand } from "./state.js";
import type { State } from "./state.js";
export function commandHelp(s: State): void {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  for (const key in s.commands) {
    const cmd = s.commands[key];
    console.log(`${cmd.name}: ${cmd.description}`);
  }
}
