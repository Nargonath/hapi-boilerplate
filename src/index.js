import Hapi from 'hapi';
import HapiSequelize from 'hapi-sequelizejs';
import Sequelize from 'sequelize';
import chalk from 'chalk';

process.on('unhandledRejection', (reason, p) => {
  console.error(chalk`{brightRed.bold Unhandled rejection at ${p}}:`, reason);
  process.exit(1); // eslint-disable-line no-process-exit
});

import { getConfig } from './config';

const serverConfig = getConfig('/server');
const server = new Hapi.Server({ host: serverConfig.host, port: serverConfig.port });

(async function start() {
  const databaseConfig = getConfig('/database');
  await server.register([
    {
      plugin: HapiSequelize,
      options: [
        {
          name: databaseConfig.name,
          models: ['./plugins/**/model.js', './plugins/**/models/*.js'],
          sequelize: new Sequelize(
            databaseConfig.credentials.dbName,
            databaseConfig.credentials.user,
            databaseConfig.credentials.pass,
            {
              dialect: databaseConfig.credentials.dialect,
              host: databaseConfig.credentials.host,
              port: databaseConfig.credentials.port,
              logging: databaseConfig.logging,
              // @see: https://github.com/sequelize/sequelize/issues/8417#issuecomment-334056048
              operatorsAliases: false,
            },
          ),
        },
      ],
    },
  ]);

  await server.start();

  console.log();
  console.log(
    chalk`Server started on: {greenBright.bold ${serverConfig.host}:${serverConfig.port}}`,
  );
})();
