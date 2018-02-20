import jwt from 'jsonwebtoken';
import WebSocket from 'ws';
import MESSAGE from './messageType';

//## Variables
const shouldLog = true;

//## Functions
const log = (...msg)=>(!shouldLog)?void(0):console.log(`||WS|| `,...msg)
const onmessage = function (name, callback) {
  if (!this.messagelisteners) this.messagelisteners = {};
  this.messagelisteners[name] = callback;
}
const sendmessage = function (name, payload = false) {
  log(`Sending ${name} message to client`)
  try {
    if (this.readyState === WebSocket.OPEN)
      this.send(JSON.stringify({
        [name]: payload
      }))
    else throw new Error(`Not Open (${this.readyState})`)
  } catch (e) {
    log(`Failed to send ""${name}"" message because "${e.message}"`)
  }
}
const handlemessage = function (message) {
  let msg = JSON.parse(message);
  let type = Object.keys(msg)[0]
  let payload = msg[type];
  let handler = this.messagelisteners[type]
  if (typeof handler === "function") handler(payload)
}


const onConnect = ws => {
  log("Connected")
  //## Setup Code
  ws.onmessage = onmessage.bind(ws)
  ws.sendmessage = sendmessage.bind(ws)
  ws.handlemessage = handlemessage.bind(ws)
  ws.on('message', ws.handlemessage);
  ws.on('close', () => log("Closing connection"))
  ws.on('error', error => error.code !== 'ECONNRESET' ? log("ERROR", error) : void (0))
  //##

  ws.sendmessage(MESSAGE.server.requestAuth)
  ws.onmessage(MESSAGE.client.sendAuth, validateAuth.bind(ws))

}
const validateAuth = function(token){
  try {
      let user = jwt.verify(token, process.env.SECRET_KEY)
      this.authorised = true;
      this.sendmessage(MESSAGE.server.acceptAuth)
    } catch (e) {
      this.authorised = false;
      this.sendmessage(MESSAGE.server.refuseAuth)
    }
}
export default onConnect;