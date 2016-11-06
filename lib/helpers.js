var moment = require('moment-timezone');

module.exports = {
  datetime: datetime
}

function datetime(dateStr, format) {
  return moment(dateStr, format).tz('America/New_York');
}