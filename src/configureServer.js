import HapiSequelize from 'hapi-sequelizejs';
import Sequelize from 'sequelize';

import { getConfig } from './config';

export const configureServer = async server => {
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
};
