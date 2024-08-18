import * as fs from "fs";

export const saveInFile = (path: string, fileName: string, content: string) => {
  
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
  
  const filePath:string = `${path}/${fileName}`;

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error("Ocurrió un error al intentar guardar el archivo:", err);
      return;
    }
    console.log("El archivo se ha guardado exitosamente.");
  });
};
