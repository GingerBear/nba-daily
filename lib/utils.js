
var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

module.exports = {
  formatDate: formatDate,
  whitelister: whitelister,
  week: week
}

function formatDate(item) {
  var date = new Date(+(item.mediaDateUts + '000'));
  item.date = week[date.getDay()] + ', ' + (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();
}

function whitelister(whitelist) {
  return function(item) {
    //return true;
    for (var i = 0; i < whitelist.length; i++) {
      if (whitelist[i].test(item.title.toLowerCase())) {
        return true;
      }
    }
    return false;
  }
}