const fs = require('fs');

module.exports = function (context, cb) {
  fs.readFile('./node_server/index.html', 'utf8', (err, result) => {
    cb(eval('`' + result + '`'));
  })
}
