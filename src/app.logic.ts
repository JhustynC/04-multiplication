import { saveInFile } from "./saveFile";
import { yarg } from "./config/plugins/yargs.plugin";

console.log(yarg);

const { b: base, l: limit, s: show } = yarg;
let numberTable: string = "";
numberTable += `
=============================
        Tablas del ${base}         
=============================
`;

//Para generar una lista de numeros del uno hasta un limite seleccionado
const numbers: number[] = Array.from(
  { length: Math.ceil(limit) },
  (_, i) => 1 + i
);

//Multiplicamos cada numerp del array generado anteriormente con la base
numbers.forEach((number) => {
  numberTable += `${number} x ${base} = ${number * base}\n`;
});

if (show) {
  console.log(numberTable);
}

saveInFile("outputs", `tabla-${base}.txt`, numberTable);
