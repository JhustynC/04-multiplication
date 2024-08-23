import { ServerApp } from '../presentation/server-app';

describe('Test App.ts', () => {
  
  it("Should call Server.run with values", async () => {
    
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = ["node", "app.ts", "-b", "10", "-l", "20",'-s'];
    console.log(process.argv);
    
    await import('../../src/app');

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      limit: 20,
      showTable: true,
      fileName: 'multiplication-table',
      fileDestination: 'outputs',
    });
    
    expect(serverRunMock).toHaveBeenCalledTimes(1);
  
  });
});