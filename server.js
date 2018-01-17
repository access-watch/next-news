const express = require('express');
const expressWs = require('express-ws');

const next = require('next');

const config = { data: { protocol: 'memory'} };
const accessWatch = require('access-watch')(config);
const { createLog } = accessWatch.util;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

function expressAccessWatchBlocker (server) {
  const { rules } = accessWatch.databases;
  server.use((req, res, next) => {
    const log = createLog(req, res);
    if (rules.matchLog(log)) {
      res.status(403);
      res.send('Blocked.')
    }
    next();
  });
}

function expressAccessWatchLogger (server) {
  const nativeInput = {
    name: 'Express Middleware',
    start: ({success, error, status}) => {
      server.use((req, res, next) => {
        try {
          const log = createLog(req, res);
          success(log);
        } catch (err) {
          error(err);
        }
        next();
      })
      status(null, `Listening.`);
    },
  };

  accessWatch.pipeline.registerInput(nativeInput);

  accessWatch.pipeline.start();
}

app
.prepare()
.then(() => {
  const server = express();
  const port = process.env.PORT || 3000;

  // Make sure the IP address is properly detected by Express on 'now' platform
  server.set('trust proxy', 'loopback, uniquelocal');

  // We need to setup express-ws here to make Access Watch's websocket works
  expressWs(server);

  // Serve Access Watch internal API and Dashboard
  const accessWatchPath = '/_access_watch';

  // Mount Access Watch apps
  const { api, dashboard, websocket } = accessWatch.apps;
  server.use(accessWatchPath, api);
  server.use(accessWatchPath, dashboard);
  server.use(accessWatchPath, websocket);

  // Setup middleware to enforce blocking
  expressAccessWatchBlocker(server)

  // Setup middleware to log requests
  expressAccessWatchLogger(server);

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err
    if (dev) {
      console.log(`> Ready on http://localhost:${port}`)
    }
  })
});
