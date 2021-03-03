import axios from 'axios';

import {BACKEND_BASE} from '../config';

export const client = axios.create({
  baseURL: BACKEND_BASE,
});

client.interceptors.response.use(
  (response) => response.data,
  (error) =>
    Promise.reject({
      status: error.response.status,
      response: error.response.data,
    }),
);

export default client;
