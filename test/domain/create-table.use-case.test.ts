import { CreateTable } from "../../src/domain/use-cases/create-table.use-case";

describe("domain/use-cases/CreateTableUseCase", () => {
  test("Should create table with default values", () => {
    const createTable = new CreateTable();

    const table = createTable.execute({ base: 2 });
    const rows = table.split("\n").length;
    console.log(table);

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain("1 x 2 = 2");
    expect(table).toContain("10 x 2 = 20");
    expect(rows).toBe(13);
  });

  test("Should create table with custom values", () => {
    const createTableExecuteMock = jest.spyOn(CreateTable.prototype, "execute");

    const customOptions = {
      base: 3,
      limit: 30,
    };

    const createTable = new CreateTable();

    const table = createTable.execute(customOptions);
    const rows = table.split("\n").length;
    console.log(table);

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(createTableExecuteMock).toHaveBeenCalledWith(
      expect.objectContaining(customOptions)
    );
    expect(table).toContain("1 x 3 = 3");
    expect(table).toContain("10 x 3 = 30");
    expect(rows).toBe(33);
  });
});
