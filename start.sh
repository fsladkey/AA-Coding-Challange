trap "kill 0" SIGINT

if [[ $( lsof -i tcp:3000) = *node* || $( lsof -i tcp:8080) = *Python* ]]; then
  echo "Error: Application ports are already in use"
else
  if [ ! -d "./node_server/node_modules" ]; then
    npm install --prefix ./node_server
  fi
  node node_server/server.js & python python_server/server.py
fi
