import { Router } from 'express';
import messageTypes from '../socket/messageType.json';
const router = Router()
router.get('/test', (req, res) => {
  res.send("It worked");
})
router.get('/socket-message-types', (req, res) => {
  res.send(JSON.stringify(messageTypes));
})

export default router;