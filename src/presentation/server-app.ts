import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { Savefile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  fileName: string;
  fileDestination: string;
}

export class ServerApp {
static run({ base, limit, showTable, fileName, fileDestination }: RunOptions) {
    console.log("Server running...");

    const table = new CreateTable().execute({ base, limit });
    const wasCreated = new Savefile().execute({
      fileContent: table,
      fileName: fileName,
      fileDestination: fileDestination
    });

    if (showTable) console.log(table);
    (wasCreated) ? console.log("File created") : console.log("File not created");
  }
}
