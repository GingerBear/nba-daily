// import {mockData} from './mock-data';
import moment from 'moment-timezone';

export function getJson(url) {
  // return Promise.resolve(mockData);

  return fetch(url, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: "same-origin"
  }).then((response) => {
    return response.json()
  });
}

export function postData(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: "same-origin"
  });
}

export function datetime(dateStr, format) {
  return moment(dateStr, format).tz('America/New_York');
}