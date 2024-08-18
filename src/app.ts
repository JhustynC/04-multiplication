import { yarg } from "./config/plugins/yargs.plugin";
import { ServerApp } from "./presentation/server-app";

//punto de entrada de la aplicacion

(async () => {
  await main();
  console.log("Fin de programa");
})();

async function main() {
  // console.log(yarg); 
  const { b: base, l: limit, s: showTable } = yarg;
  ServerApp.run({ base, limit, showTable }); 
}