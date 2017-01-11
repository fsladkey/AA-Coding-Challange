# import pdb
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer

PORT_NUMBER = 8080

class appHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        f = open('data.json')
        f.seek(0)
        contents = f.read()
        f.close()
        self.wfile.write(contents)
        return

try:
    server = HTTPServer(('', PORT_NUMBER), appHandler)
    print 'Started httpserver on port ', PORT_NUMBER
    server.serve_forever()

except KeyboardInterrupt:
    print '^C received, shutting down the web server'
    server.socket.close()
