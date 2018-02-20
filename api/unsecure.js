import { Router } from 'express'
import JWT from 'jsonwebtoken'
import DB from '../data'
const router = Router();
router.post('/login', async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log("Pre")
  let user = await DB.login({email, password})
  console.log("post")
  if (user)
    res.json({
      success: true,
      token: JWT.sign(JSON.stringify(user), process.env.SECRET_KEY)
    });
  else res.sendStatus(403);
})
export default router;