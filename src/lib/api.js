import { getJson } from './utils';

var dataURL = 'https://dl.dropboxusercontent.com/s/kcwrqyr8455lsq6/nba-daily.json';

export function getData() {
  return getJson(dataURL);
}
