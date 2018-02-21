import jwt from 'jsonwebtoken';
import WebSocket from 'ws';
import MESSAGE from './messageType';
import DB from '../data';

//## Variables
const shouldLog = true;

//## Functions
const log = (...msg)=>(!shouldLog)?void(0):console.log(`||WS|| `,...msg)
const onmessage = function (name, callback) {
  if (!this.messagelisteners) this.messagelisteners = {};
  this.messagelisteners[name] = callback;
}
const sendMessage = function (name, payload = false) {
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
  ws.sendMessage = sendMessage.bind(ws)
  ws.handlemessage = handlemessage.bind(ws)
  ws.on('message', ws.handlemessage);
  ws.on('close', () => log("Closing connection"))
  ws.on('error', error => error.code !== 'ECONNRESET' ? log("ERROR", error) : void (0))
  //##

  ws.sendMessage(MESSAGE.server.requestAuth)
  ws.onmessage(MESSAGE.client.sendAuth, validateAuth.bind(ws))
  ws.onmessage(MESSAGE.client.requestPlayerData, sendPlayerData.bind(ws))

}
const validateAuth = function(token){
  try {
      let userId = jwt.verify(token, process.env.SECRET_KEY)
      this.authorised = {id:userId};
      this.sendMessage(MESSAGE.server.acceptAuth)
    } catch (e) {
      this.authorised = false;
      this.sendMessage(MESSAGE.server.refuseAuth)
    }
}
const sendPlayerData = async function(){
  if(!this.authorised) return this.sendMessage(MESSAGE.server.unauthorised);
  let user = await DB.getUserById(JSON.parse(this.authorised.id))
  user = JSON.parse(JSON.stringify(user))
  delete user.password
  delete user._id
  delete user.created_at
  delete user.updated_at
  this.sendMessage(MESSAGE.server.sendPlayerData,user)
}

export default onConnect;