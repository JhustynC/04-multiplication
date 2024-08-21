import { Savefile } from "../../domain/use-cases/save-file.use-case";
import fs from "fs";

describe("", () => {
  beforeEach(() => {
    //clean up
    jest.clearAllMocks();
    if (fs.existsSync("outputs")) fs.rmSync("outputs", { recursive: true });
    if (fs.existsSync("custom-outputs"))
      fs.rmSync("custom-outputs", { recursive: true });
  });

  afterEach(() => {
    //clean up
    jest.clearAllMocks();
    if (fs.existsSync("outputs")) fs.rmSync("outputs", { recursive: true });
    if (fs.existsSync("custom-outputs"))
      fs.rmSync("custom-outputs", { recursive: true });
  });

  const saveFile = new Savefile();

  it("should save file with default values", async () => {
    const filePath = "outputs/table.txt";
    const options = {
      fileContent: "test content",
    };

    const result = await saveFile.execute(options);
    expect(result).toBe(true);

    const checkFile = fs.existsSync(filePath);
    expect(checkFile).toBe(true);

    const fileContent = fs.readFileSync(filePath, "utf-8");
    expect(fileContent).toBe(options.fileContent);
  });

  it("Should save a file with custom values", async () => {
    const options = {
      fileContent: "custom content",
      fileDestination: "custom-outputs/file-destiantion",
      fileName: "custom-table-name",
    };

    const result = await saveFile.execute(options);
    expect(result).toBe(true);

    const checkFile = fs.existsSync(options.fileDestination);
    expect(checkFile).toBe(true);

    //Para leer el contenido del documento y comparar
    const fileContent = fs.readFileSync(
      options.fileDestination + "/" + options.fileName,
      "utf-8"
    );
    expect(fileContent).toBe(options.fileContent);
  });

  test("Should not create a file path", async () => {
    const mkdirSyncMock = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("Custom mkdirSync error from testing");
    });

    const result = await saveFile.execute({ fileContent: "Test Fail" });
    expect(result).toBe(false);

    //Tenemos que limpiar los mocks manualmente por que estamos usando spyOn
    mkdirSyncMock.mockRestore();
  });

  test("Should not save a file", async () => {
    const fsWriteFileMock = jest
      .spyOn(fs, "writeFile")
      .mockImplementation(() => {
        throw "Custom writeFile error from testing";
      });

    const result = await saveFile.execute({ fileContent: "Test Fail" });
    expect(result).toBe(false);

    //Tenemos que limpiar los mocks manualmente por que estamos usando spyOn
    fsWriteFileMock.mockRestore();
  });

  test("Should return a error", async () => {
    const existsSyncMock = jest
      .spyOn(fs, "existsSync")
      .mockImplementation(() => true);

    const result = await saveFile.execute({
      fileContent: "Test Fail",
    });

    // console.log(result);
    expect(result).toBe(false);

    existsSyncMock.mockRestore();
  });
});
