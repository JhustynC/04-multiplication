import { yarg } from "./config/plugins/yargs.plugin";


(async () => {
  await main();
  console.log("Fin de programa");
})();

async function main() {
  console.log(yarg); 
}