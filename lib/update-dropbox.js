var Dropbox = require('dropbox');
var config = require('./config.js')
var dbx = new Dropbox({
  accessToken: config.dropbox.accessToken
});

module.exports = function (filename, content) {
  return dbx.filesUpload({ path: filename, contents: content, mode: { ".tag": "overwrite" } })
    .then(response => {
      return dbx.sharingCreateSharedLink({ path: response.path_lower });
    });
}
