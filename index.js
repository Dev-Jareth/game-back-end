import express from 'express';
import cors from 'cors';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'ws'
import onWsConnect from './socket';
import api from './api'

var app = express();

/*###### Move These ######*/
process.env.MONGO_CONNECTION = "mongodb://root@localhost:27017";
// process.env.MONGO_CONNECTION = 'mongodb://server:change%20this1@ds127888.mlab.com:27888/game-db';
process.env.SECRET_KEY = "secrect-key";
/*########################*/

//## Setup middleware ##//
app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());


//## API ##//
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end('error');
});
/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = val => isNaN(parseInt(val, 10)) ? val : parseInt(val, 10) >= 0 ? parseInt(val, 10) : false;
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP & WS server.
 */
const server = http.createServer(app);
const wss = new Server({ server, path: "/socket" });
wss.on('connection', onWsConnect)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', () => console.log(`CORS-Enabled NodeJS Server listening on ${'port '+server.address().port||server.address()}`));
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') throw error;

  var bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
module.exports = app;