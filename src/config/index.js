/* eslint-disable no-process-env */
import Confidence from 'confidence';

const criteria = { env: process.env.NODE_ENV };
const store = new Confidence.Store();
export const getConfig = key => store.get(key, criteria);

const config = {
  database: {
    name: 'mainDb',
    credentials: {},
  },
};

store.load(config);
