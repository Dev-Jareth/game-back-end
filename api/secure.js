import { Router } from 'express';
const router = Router()
router.get('/test', (req, res) => {
  res.send("It worked");
})

export default router;