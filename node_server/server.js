const http = require('http');
const app = http.createServer(handler);
const PORT = process.env.PORT || 3000;

function handler(req, res) {
  if (!isValid(req)) {
    res.writeHead(404);
    res.end('URL did not match any routes');
  }
  res.writeHead(200);
  get('http://localhost:8080').then(response => {
    res.end(response);
  }, err => handleError)
}

function isValid(req) {
  return req.url.match(/\/status\/?/);
}

function get(url) {
  return new Promise((resolve) => {
    function handleResponse(response) {
      let str = '';
      response.on('data', (chunk) => str += chunk);
      response.on('end', () => resolve(str));
    }
    http.request(url, handleResponse).end();
  });
}

app.listen(PORT)
console.log(`listening on ${PORT}`)
