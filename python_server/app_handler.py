import re
import time
import json
from store import Store
from BaseHTTPServer import BaseHTTPRequestHandler

FILE_NAME = 'data.json'


class AppHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.store = Store(FILE_NAME)
        self.update_stats()
        self.store.save()
        self.render_json(self.store.data)

    def at_status_route(self):
        return re.match('\/status\/?', self.path)

    def update_stats(self):
        self.store['uptime'] = time.time() - self.store["starttime"]
        self.update_first_hit_stat()
        if self.at_status_route():
            self.store['numstatushits'] += 1
        else:
            self.update_path_stats()

    def update_first_hit_stat(self):
        if not self.store['firsthit']:
            self.store['firsthit'] = time.time()

    def update_path_stats(self):
        if self.path in self.store['numendpointhits']:
            self.store['numendpointhits'][self.path] += 1
        else:
            self.store['numendpointhits'][self.path] = 1

    def render_json(self, content, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(content))
