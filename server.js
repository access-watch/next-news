const express = require('express');
const expressWs = require('express-ws');
const onFinished = require('on-finished');

const next = require('next');

const config = { data: { protocol: 'memory'} };
const accessWatch = require('access-watch')(config);
const { createLog } = accessWatch.util;
const { rules } = accessWatch.databases;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

function expressAccessWatch (server) {
  const nativeInput = {
    name: 'Express Middleware',
    start: ({success, error, status}) => {
      server.use((req, res, next) => {
        // Logging
        onFinished(res, () => {
          try {
            success(createLog(req, res));
          } catch (err) {
            error(err);
          }
        })

        // Blocking
        if (rules.matchLog(createLog(req, res))) {
          res.status(403);
          res.send('Blocked.')
          return
        }

        next()
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
  server.use(
    '/_access_watch',
    accessWatch.apps.api,
    accessWatch.apps.dashboard,
    accessWatch.apps.websocket
  );

  // Setup logging/blocking middleware
  expressAccessWatch(server)

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
