import yargs, { number } from "yargs";
import { hideBin } from "yargs/helpers";

export const yarg = yargs(hideBin(process.argv))
  .option("b", {
    alias: "base",
    type: "number",
    // default: 5,
    demandOption: true,
    describe: "Multiplication table base",
  })
  .option("l", {
    alias: "limit",
    type: "number",
    default: 10,
    // demandOption: true,
    describe: "Multiplication table limit",
  })
  .option("s", {
    alias: "show",
    type: "boolean",
    default: false,
    describe: "Show multiplication table",
  })
  .check((argv, options) => {
    if (argv.b < 1)
      throw new Error("Error: The base number must be greater than 0");
    if (argv.l < 1)
      throw new Error("Error: The limit number must be greater than 0");
    return true; // Si la validación pasa
  })
  .parseSync();
