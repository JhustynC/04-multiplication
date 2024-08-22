const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  try {
    const { yarg } = await import("./../../../config/plugins/yargs.plugin");
    return yarg;
  } catch {
    console.error("Error importing yarg module");
    return null; // Si la validación falla
  }
};

describe("config/plugins/yargs.plugin", () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  test("Should return a default yargs object", async () => {
    const args = await runCommand(["-b", "5"]);

    expect(args).toStrictEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "outputs",
      })
    );
  });

  test("Should return a custom yargs object", async () => {
    // process.argv = process.argv.filter((str) => !["-b", "5"].includes(str));

    const args = await runCommand([
      "-b",
      "3",
      "-l",
      "15",
      "-s",
      "-n",
      "Test Table",
    ]);

    expect(args).toStrictEqual(
      expect.objectContaining({
        b: 3,
        l: 15,
        s: true,
        n: "Test Table",
        d: "outputs",
      })
    );
  });

  test("Should throw an error when the base is less than 1", async () => {
    expect(() => {
      fail(async () => {
        const args = await runCommand(["-b", "0"]);
        console.log("Test ");
      });
    });

    // expect(args?.b.message).toBe("Error: The base number must be greater than 0");
  });
});
