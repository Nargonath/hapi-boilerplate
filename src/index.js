import Hapi from 'hapi';
import chalk from 'chalk';

process.on('unhandledRejection', (reason, p) => {
  console.error(chalk`{redBright.bold Unhandled rejection at ${p}}:`, reason);
  process.exit(1); // eslint-disable-line no-process-exit
});

import { getConfig } from './config';
import { configureServer } from './configureServer';

const serverConfig = getConfig('/server');
const server = new Hapi.Server({ host: serverConfig.host, port: serverConfig.port });

(async function start() {
  await configureServer(server);

  await server.start();

  console.log();
  console.log(
    chalk`Server started on: {greenBright.bold ${serverConfig.host}:${serverConfig.port}}`,
  );
})();

export { server };
