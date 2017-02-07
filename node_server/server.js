const http = require('http');
const PORT = process.env.PORT || 3000;
const template = require('./template');
const get = require('./util').get;

const SERVER_URL = "http://localhost:8080/status"
const isValid = (req) => req.url === '/';

function handler(req, res) {
  if (!isValid(req)) {
    res.writeHead(404);
    res.end('URL did not match any routes');
    return
  }

  res.writeHead(200);
  get(SERVER_URL).then(
    response => template(response, result => res.end(result)),
    err => handleError
  )
}

http.createServer(handler).listen(PORT);
console.log(`listening on ${PORT}`)
