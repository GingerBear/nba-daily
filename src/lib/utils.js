import moment from 'moment-timezone';

export const FAV_TEAM_KEY = 'nbaDailyfavTeams2';

export function getJson(url) {
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  }).then(response => {
    return response.json();
  });
}

export function postData(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'same-origin'
  });
}

export function datetime(dateStr, format) {
  return moment(dateStr, format).tz('America/New_York');
}

export function getInitialData() {
  let favTeams;
  try {
    favTeams = JSON.parse(localStorage.getItem(FAV_TEAM_KEY)) || [];
  } catch (e) {
    favTeams = [];
  }

  return {
    rankings: {},
    lastUpdate: null,
    gameDates: [],
    favTeams
  };
}

export function gameFavLevel(favTeams, gameTeams) {
  const teamA = favTeams.indexOf(gameTeams[0].triCode) > -1 ? 1 : 0;
  const teamB = favTeams.indexOf(gameTeams[1].triCode) > -1 ? 1 : 0;

  return teamA + teamB;
}
