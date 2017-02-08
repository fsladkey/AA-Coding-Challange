const http = require('http');

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
  }
}
