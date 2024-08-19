import fs from "fs";

export interface SaveFileOptions {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export interface SaveFileUseCase {
  execute: (options: SaveFileOptions) => boolean;
}

export class Savefile implements SaveFileUseCase {
  constructor /**repository: StorageRepository */() {}
  
  execute({
    fileContent,
    fileDestination = 'outputs',
    fileName = 'table.txt'
  }: SaveFileOptions): boolean {
    if (!fs.existsSync(fileDestination)) {
      fs.mkdirSync(fileDestination, { recursive: true });
    }

    const filePath: string = `${fileDestination}/${fileName}`;

    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        console.error("Ocurrió un error al intentar guardar el archivo:", err);
        return false;
      }
      console.log("El archivo se ha guardado exitosamente.");
    });
    return true;
  }
}
