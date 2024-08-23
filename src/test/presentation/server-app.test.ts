import { CreateTable } from "../../domain/use-cases/create-table.use-case";
import { Savefile } from "../../domain/use-cases/save-file.use-case";
import { ServerApp } from "../../presentation/server-app";
import fs from "fs";

describe("presentation/server-app.ts", () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileName: "test-fileName.txt",
    fileDestination: "test-destination",
  };

  afterEach(() => {
    //clean up
    jest.clearAllMocks();
    if (fs.existsSync("test-destination"))
      fs.rmSync("test-destination", { recursive: true });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test("Should return	a ServerApp instance", () => {
    const app = new ServerApp();
    expect(app).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("Should run ServerApp with options", async () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    const saveFileSpy = jest.spyOn(Savefile.prototype, "execute");

    await ServerApp.run(options);

    expect(consoleLogSpy).toHaveBeenCalledWith("Server running...");
    expect(consoleLogSpy).toHaveBeenCalledTimes(2);
    expect(consoleLogSpy).toHaveBeenCalledWith("File created");

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileName: options.fileName,
      fileDestination: options.fileDestination,
    });
  });

  test("Should run with custom values mocked", async () => {
    const createMock = jest.fn().mockReturnValue("1 x 2 = 2");
    const saveFileMock = jest.fn().mockReturnValue(true);
    const logMock = jest.fn();
    const errorMock = jest.fn();

    CreateTable.prototype.execute = createMock;
    Savefile.prototype.execute = saveFileMock;
    global.console.log = logMock; //Objeto global de node (En navegadores es el window)
    global.console.error = errorMock; //Objeto global de node (En navegadores es el window)

    await ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("Server running...");
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: "1 x 2 = 2",
      fileName: options.fileName,
      fileDestination: options.fileDestination,
    });

    expect(saveFileMock).toHaveReturned();

    expect(logMock).toHaveBeenCalledWith("File created");
    expect(errorMock).not.toHaveBeenCalled();
  });
});
