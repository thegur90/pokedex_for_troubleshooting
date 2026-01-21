import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";
import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((x) => x.length > 0);
}

function handleCommand(words: string[], s: State): void {
  const commandName = words[0];
  const commands = s.commands;
  const cmd = commands[commandName];
  if (!cmd) {
    console.log(
      `Unknown command: "${commandName}". Type "help" for a list of commands.`,
    );
    return;
  }

  try {
    cmd.callback(s);
  } catch (e) {
    console.log(e);
  }
}

export function startREPL(s: State) {
  function handleInput(line: string) {
    const words = cleanInput(line);
    if (words.length > 0) {
      handleCommand(words, s);
    } else {
      //handle empty prompt
    }
    s.rl.prompt();
  }

  s.rl.on("line", handleInput);
  s.rl.prompt();
}
