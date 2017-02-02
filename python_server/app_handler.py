import re
import time
import json
from store import Store
from BaseHTTPServer import BaseHTTPRequestHandler


class AppHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.update_stats()

    def update_stats(self):
        store = Store('data.json')
        store['uptime'] = time.time() - store["starttime"]
        if not store['firsthit']:
            store['firsthit'] = time.time()
        if re.match('\/status\/?', self.path):
            store['numstatushits'] += 1
        else:
            if self.path in store['numendpointhits']:
                store['numendpointhits'][self.path] += 1
            else:
                store['numendpointhits'][self.path] = 1
        store.save()
        self.render_json(store.data)

    def render_json(self, content, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(content))
