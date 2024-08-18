import { saveInFile } from "./saveFile";
import { yarg } from "./config/plugins/yargs.plugin";

console.log(yarg);

const base = yarg.b;
let numberTable: string = "";
numberTable += `
=============================
        Tablas del ${yarg.b}         
=============================
`;

const numbers: number[] = Array.from(
  { length: Math.ceil(yarg.l) },
  (_, i) => 1 + i
);

numbers.forEach((number) => {
  numberTable += `${number} x ${yarg.b} = ${number * yarg.b}\n`;
});

if (yarg.s) {
  console.log(numberTable);
}

saveInFile("outputs", `tabla-${yarg.b}.txt`, numberTable);
