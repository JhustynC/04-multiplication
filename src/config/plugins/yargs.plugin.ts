import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const checkFunction = (
  argv: yargs.Arguments<
    {
      b: number;
    } & {
      l: number;
    } & {
      s: boolean;
    } & {
      n: string;
    } & {
      d: string;
    }
  >,
  aliases: {
    [alias: string]: string;
  }
): boolean => {
  if (argv.b < 1)
    throw new Error("Error: The base number must be greater than 0");
  if (argv.l < 1)
    throw new Error("Error: The limit number must be greater than 0");
  return true; // Si la validación pasa
};

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
  .option("n", {
    alias: "name",
    type: "string",
    default: "multiplication-table",
    describe: "File Name",
  })
  .option("d", {
    alias: "destiantion",
    type: "string",
    default: "outputs",
    describe: "File destiantion",
  })
  // .coerce({ //para transformar uno de la opciones si es necesario o para validar
  //   b: (arg) => {
  //     if (arg < 1)
  //       throw new Error("Error: The base number must be greater than 0");
  //     return arg;
  //   },
  //   l: (arg) => {
  //     if (arg < 1)
  //       throw new Error("Error: The limit number must be greater than 0");
  //     return arg;
  //   },
  // })
  .check((argv, aliases) => {
    if (argv.b < 1)
      throw new Error("Error: The base number must be greater than 0");
    if (argv.l < 1)
      throw new Error("Error: The limit number must be greater than 0");
    return true; // Si la validación pasa
  })
  .fail((msg, err, yargs) => {
    //Si algun check falla
    // console.error("You should be doing", yargs.help());
    if (err) {
      yargs.showHelp();
      // process.stderr.write(msg + "\n"); // Error message for console
      throw msg; // Error message for console
    }
  })
  .parseSync();
