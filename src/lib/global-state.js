var globalState;
var subscribers;

init();

function init() {

  try {
    globalState = JSON.parse(localStorage.getItem('nbaDailyGlobalState'));
  } catch (e) { }

  globalState = Object.assign({
    favTeams: [],
    rankings: {},
    scrollPosition: 0
  }, globalState);

  subscribers = [];
}


export function setState(state = {}) {
  Object.assign(globalState, state);
  localStorage.setItem('nbaDailyGlobalState', JSON.stringify(globalState))
  notify();
}

export function getState() {
  return globalState;
}

export function subscribe(comp) {
  subscribers.push(comp);
}

export function unsubscribe(comp) {
  subscribers = subscribers.filter(c => c !== comp);
}

export function notify() {
  subscribers.forEach(comp => comp.setState(globalState));
}