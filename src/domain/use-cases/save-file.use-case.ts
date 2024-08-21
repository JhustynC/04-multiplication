import fs from "fs";

export interface SaveFileOptions {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export interface SaveFileUseCase {
  execute: (options: SaveFileOptions) => Promise<boolean>;
}

export class Savefile implements SaveFileUseCase {
  constructor /**repository: StorageRepository */() {}
  async execute({
    fileContent,
    fileDestination = "outputs",
    fileName = "table.txt",
  }: SaveFileOptions): Promise<boolean> {
    try {
      if (!fs.existsSync(fileDestination)) {
        fs.mkdirSync(fileDestination, { recursive: true });
      }

      const filePath: string = `${fileDestination}/${fileName}`;

      const hasWrite = await new Promise<boolean>((resolve, reject) => {
        fs.writeFile(filePath, fileContent, (err) => {
          if (err) reject();
          resolve(true);
        });
      });

      return hasWrite;
    } catch (err) {
      // console.log(err);
      return false;
    }
  }
}
