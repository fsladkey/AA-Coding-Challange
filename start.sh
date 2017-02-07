npm install

if [netstat -anp tcp | grep -iq 8888 && netstat -anp tcp | grep -iq 1337]; then
  echo "Error: Application ports are already in use"
else
  set -o errexit
  node node_server/server.js & python python_server/server.py
fi
