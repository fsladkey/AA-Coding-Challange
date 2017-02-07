const http = require('http');

function get(url) {
  return new Promise((resolve) => {
    function handleResponse(response) {
      let str = '';
      response.on('data', (chunk) => str += chunk);
      response.on('end', () => resolve(JSON.parse(str)));
    }
    http.request(url, handleResponse).end();
  });
}

module.exports.get = get;
