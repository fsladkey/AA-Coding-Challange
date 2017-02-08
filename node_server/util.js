const http = require('http');
const fs = require('fs');

module.exports = {
  get(url) {
    return new Promise((resolve) => {
      function handleResponse(response) {
        let str = '';
        response.on('data', (chunk) => str += chunk);
        response.on('end', () => resolve(JSON.parse(str)));
      }
      http.request(url, handleResponse).end();
    });
  },

  last(arr) {
    return arr[arr.length - 1];
  },

  template(context, cb) {
    fs.readFile('./node_server/index.html', 'utf8', (err, result) => {
      cb(eval('`' + result + '`'));
    })
  }
}
