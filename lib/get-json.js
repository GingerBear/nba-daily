var request = require('request');

module.exports = function(url) {
  return new Promise((resolve, reject) => {
    return request(url, (err, response, body) => {
      if (err) return reject(err);

      var json = {};

      try {
        json = JSON.parse(body);
      } catch(e) {
        return reject(e);
      }

      return resolve(json);
    });
  });

}