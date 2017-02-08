const fs = require('fs')
const path = require('path');
const util = require('./util');
const SERVER_URL = "http://localhost:8080/status"

module.exports = {
  renderError(req, res) {
    res.writeHead(404);
    res.end('URL did not match any routes');
  },

  renderStatus(req, res) {
    res.writeHead(200);
    util.get(SERVER_URL).then(
      response => util.template(response, result => res.end(result)),
      err => handleError
    )
  },

  renderAssets(req, res) {
    res.writeHead(200);
    const assetName = util.last(req.url.split('/'))
    const location = path.resolve(__dirname, 'assets', assetName)
    fs.readFile(location, (err, data) => {
      if (err) return console.log(err);
      res.end(data);
    })
  }
}
