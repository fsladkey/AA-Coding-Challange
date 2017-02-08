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

    def render_json(self, content, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(content))

    def update_stats(self):
        self._update_uptime_time()
        self._update_first_hit_stat()
        self._update_path_stats()

    def _update_uptime_time(self):
        self.store['uptime'] = time.time() - self.store["starttime"]

    def _update_first_hit_stat(self):
        if not self.store['firsthit']:
            self.store['firsthit'] = time.time()

    def _update_path_stats(self):
        if self.path in self.store['numendpointhits']:
            self.store['numendpointhits'][self.path] += 1
        else:
            self.store['numendpointhits'][self.path] = 1
