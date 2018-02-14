const UNAUTHENTICATED_CLIENTS = []
const CLIENTS = []
const onConnect = ws => {
  UNAUTHENTICATED_CLIENTS.push(ws)

  ws.sendMessage = sendMessage.bind(ws);
  requestAuthentication(ws)
  console.log("WS Connected")
  ws.on('message', message => {
    console.log('received: %s', message);
  });
  ws.on('close', client => {

  })
  ws.on('error', error => {
    if (error.code !== 'ECONNRESET')
      console.error("WS ERROR", error)
  })

}
export default onConnect;

const requestAuthentication = ws => ws.sendMessage("Request-Authentication")
const sendMessage = function(name, payload = false) {
  this.send(JSON.stringify({
    [name]: payload
  }))
}