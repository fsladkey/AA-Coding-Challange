const http = require('http');
const PORT = process.env.PORT || 3000;
const handlers = require('./handlers')

routes = { "^\/$": handlers.renderStatus, "assets\/": handlers.renderAssets };

function handler(req, res) {
  for (pattern in routes) {
    if (req.url.match(pattern))
      return routes[pattern](req, res)
  }
  handlers.renderError(req, res)
}

http.createServer(handler).listen(PORT);
console.log(`listening on ${PORT}`)
