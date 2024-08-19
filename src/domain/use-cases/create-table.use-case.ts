export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit: number;
}

export class CreateTable implements CreateTableUseCase {
  constructor() {
    /**
     * DI - Dependency Injection
     */
  }

  execute({ base, limit }: CreateTableOptions) {
    let numberTable: string = "";
    numberTable += `=============================\n        Tablas del ${base}\n=============================\n`;
    //Para generar una lista de numeros del uno hasta un limite seleccionado
    //Multiplicamos cada numerp del array generado anteriormente con la base
    Array.from({ length: limit }, (_, i) => 1 + i).forEach((number) => {
      numberTable += `${number} x ${base} = ${number * base}\n`;
    });

    return numberTable;
  }
}
