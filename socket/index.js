import PubSub from 'pubsub-js';
import jwt from 'jsonwebtoken';
import WebSocket from 'ws';
import MESSAGE from './messageType';
const UNAUTHENTICATED_CLIENTS = []
const CLIENTS = []


const onConnect = ws => {
  UNAUTHENTICATED_CLIENTS.push(ws)

  ws.sendMessage = sendMessage.bind(ws);
  requestAuthentication(ws)
  subscribe(MESSAGE.client.sendAuth, token => {
    try {
      let user = jwt.verify(token, process.env.SECRET_KEY)
      ws.hasAuth = true;
      let wsPos = UNAUTHENTICATED_CLIENTS.indexOf(ws)
      CLIENTS.push(UNAUTHENTICATED_CLIENTS.splice(wsPos, 1))
      ws.sendMessage(MESSAGE.server.acceptAuth)
    } catch (e) {
      ws.sendMessage(MESSAGE.server.refuseAuth)

    }

  })
  console.log("WS Connected")
  ws.on('message', handleMessage);
  ws.on('close', client => {
    console.log("Closing")
    if (ws.hasAuth) CLIENTS.splice(CLIENTS.indexOf(ws))
    else UNAUTHENTICATED_CLIENTS.splice(UNAUTHENTICATED_CLIENTS.indexOf(ws))
  })
  ws.on('error', error => {
    if (error.code !== 'ECONNRESET')
      console.error("WS ERROR", error)
  })

}
export default onConnect;
const requestAuthentication = ws => ws.sendMessage(MESSAGE.server.requestAuth)
const sendMessage = function(name, payload = false) {
  try {
    if (this.readyState === WebSocket.OPEN)
      this.send(JSON.stringify({
        [name]: payload
      }))
    else throw new Error(`Not Open (${this.readyState})`)
  } catch (e) {
    console.error(`WS Failed to send ""${name}"" message because "${e.message}"`)
  }
}
const handleMessage = message => {
  console.log("WS Message Received")
  try {
    let msg = JSON.parse(message);
    let type = Object.keys(msg)[0]
    let payload = msg[type];
    publish(type, payload)
    console.log(`WS Parsed Data on ""${type}"" message`)
  } catch (e) {
    console.error("WS Failed to parse message")
  }
}
const publish = PubSub.publish;
export const subscribe = (key, callback) => PubSub.subscribe(key, (a, b) => callback(b));
export const unsubscribe = PubSub.unsubscribe;