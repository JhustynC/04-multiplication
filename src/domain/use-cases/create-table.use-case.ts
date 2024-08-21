export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  constructor() {
    /**
     * DI - Dependency Injection
     */
  }

  execute({ base, limit = 10 }: CreateTableOptions) {
    let numberTable: string = "";
    numberTable += `=============================\n        Tablas del ${base}\n=============================\n`;

    //Para generar una lista de numeros del uno hasta un limite seleccionado
    const numberArray = Array.from({ length: limit }, (_, i) => i + 1);

    //Multiplicamos cada numerp del array generado anteriormente con la base
    numberArray.forEach((number) => {
      numberTable += `${number} x ${base} = ${number * base}`;

      if (number !== numberArray[numberArray.length-1]) numberTable += "\n";
    });

    return numberTable;
  }
}
