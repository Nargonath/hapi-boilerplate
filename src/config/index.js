/* eslint-disable no-process-env */
import Confidence from 'confidence';
import envy from 'envy';

const configValues = envy();
const criteria = { env: configValues.nodeEnv };
const store = new Confidence.Store();

export const getConfig = key => store.get(key, criteria);

const config = {
  database: {
    name: 'mainDb',
    credentials: {
      dbName: configValues.databaseName,
      user: configValues.databaseUser,
      pass: configValues.databasePass,
      dialect: configValues.databaseDialect,
      host: configValues.databaseHost,
      port: configValues.databasePort,
    },
    logging: {
      $filter: 'env',
      production: false,
      development: console.log,
    },
  },

  server: {
    host: configValues.host,
    port: configValues.port,
  },

  security: {
    bcryptRound: {
      $filter: 'env',
      production: configValues.bcryptRound,
      development: configValues.bcryptRound,
      test: 1,
    },
    jwt: {
      key: configValues.jwtKey,
      cookieOptions: {
        ttl: 1000 * 60 * 60 * 24 * 2, // valid for 2 days
        isSecure: true,
        isHttpOnly: true,
        encoding: 'none',
        clearInvalid: false,
        strictHeader: true,
      },
    },
    hash: { algorithm: configValues.hashAlgorithm },
  },
};

store.load(config);
