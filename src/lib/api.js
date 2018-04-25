import { getJson } from "./utils";

var dataURL =
  "https://dl.dropboxusercontent.com/s/i2tqoo6wtt7acjx/nba-data.json";

export function getData() {
  return getJson(dataURL);
}
