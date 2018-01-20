# Redux and Node boilerplate application

This repository is meant to be used to reduce startup time for simple React/Redux applications that require a backend server.

When started, npm-run-all spins up both the express server with nodemon and the Redux app with react-scripts.

The server is proxied onto the Redux app so it can be called within the Redux app by using `fetch('/api/route-goes-here');`

### Usage

* Fork (if you want to manage your app on git) and Clone the repository
* Run `npm i`
* Run `npm start`
* Start coding! Nodemon and react-scripts will automatically update your app as you make changes. 