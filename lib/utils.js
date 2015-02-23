module.exports = {
  formatDate: formatDate,
  whitelister: whitelister
}

function formatDate(item) {
  item.date = new Date(+(item.mediaDateUts + '000')).toLocaleDateString();
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