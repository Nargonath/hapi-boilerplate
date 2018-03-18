import Hapi from 'hapi';
import { configureServer } from '../configureServer';

test('should configure a server instance without error', async () => {
  const server = new Hapi.Server();

  try {
    await configureServer(server);
    await server.start();
    await server.stop();
  } catch (err) {
    expect(err).toBeUndefined();
  }
});
