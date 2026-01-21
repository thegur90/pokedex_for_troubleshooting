import { startREPL } from "./repl.js";
import type { State } from "./state.js";
import { initState } from "./state.js";

function main() {
  const s = initState();
  startREPL(s);
}

main();
