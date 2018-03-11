process.on('unhandledRejection', (reason, p) => {
  console.error(`Unhandled rejection at ${p}:`, reason);
});

import Hapi from 'hapi';
import HapiSequelize from 'hapi-sequelizejs';
import Sequelize from 'sequelize';
import chalk from 'chalk';

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
            },
          ),
        },
      ],
    },
  ]);

  await server.start();

  console.log(`Server started on: [{greenBright.bold ${serverConfig.host}:${serverConfig.port}}]`);
})();
