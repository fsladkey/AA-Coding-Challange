import time
from BaseHTTPServer import HTTPServer
from app_handler import AppHandler
from store import Store

PORT_NUMBER = 8080


def set_start_time():
    store = Store('data.json')
    if not store['starttime']:
        store['starttime'] = time.time()
    store.save()

try:
    server = HTTPServer(('', PORT_NUMBER), AppHandler)
    set_start_time()
    print 'Started httpserver on port ', PORT_NUMBER
    server.serve_forever()

except KeyboardInterrupt:
    print '^C received, shutting down the web server'
    server.socket.close()
