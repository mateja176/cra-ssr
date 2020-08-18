import fetch from 'isomorphic-fetch';
import { Launch } from './model';

const API = 'https://api.spacexdata.com/v4/';

export const fetchLaunches = () => {
  return fetch(new URL('launches', API).toString()).then(
    (res) => res.json() as Promise<Launch[]>,
  );
};
