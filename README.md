1) Create a HTTP API server application in Python that has a single endpoint, /status, that should return a JSON response with the following content:

 a) how long the application has been running (since the start of this process)

 b) the number of times this endpoint has been called since the start of this process

 c) the date/time at which this endpoint was first called, ever (independent of this particular process)

 d) the number of times any of the server's endpoints have been called, ever (also independent of this particular process)

To clarify, for steps c) and d), if the application terminates and is restarted at a later time, the existing times/values should persist.

You may not use a database for this application.

2) Create a HTTP server in NodeJS with an index route (/) that:

 a) Calls /status on the API server

 b) Renders an HTML result page containing the API results, displayed in a way of your choosing

3) Create a setup script using BASH that will install all dependencies for the above applications in an Ubuntu Linux environment.

4) Create a shell script for each of the two applications built that will start the application if and only if it is not already running.
