# import pdb
import re
import json
import time
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer

PORT_NUMBER = 8080


def overwrite_file(f, contents):
    f.seek(0)
    f.write(contents)
    f.truncate()
    f.close()


def set_start_time():
    f = open('data.json', 'r+')
    contents = f.read()
    data = json.loads(contents)
    if not data['starttime']:
        data['starttime'] = time.time()
    data = json.dumps(data, sort_keys=True)
    overwrite_file(f, data)
    f.close()


def update_stats():
    f = open('data.json', 'r+')
    contents = f.read()
    data = json.loads(contents)
    data['uptime'] = time.time() - data["starttime"]
    data['numstatushits'] += 1
    data = json.dumps(data, sort_keys=True)
    overwrite_file(f, data)
    f.close()
    return data


class appHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        if re.match('\/status\/?', self.path):
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            contents = update_stats()
            self.wfile.write(contents)
        else:
            self.send_response(404)
            self.send_header('Content-type', 'text/html')
            contents = 'URL did not match any routes'
            self.end_headers()
            self.wfile.write(contents)


try:
    server = HTTPServer(('', PORT_NUMBER), appHandler)
    set_start_time()
    print 'Started httpserver on port ', PORT_NUMBER
    server.serve_forever()

except KeyboardInterrupt:
    print '^C received, shutting down the web server'
    server.socket.close()
