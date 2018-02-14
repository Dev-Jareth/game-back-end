import { Router } from 'express'
import JWT from 'jsonwebtoken'
import { getUserFacadeByEmail, validateUser } from '../authenticate'
const router = Router();
router.post('/login', (req, res) => {
  console.log("We Here")
  let email = req.body.email;
  let password = req.body.password;
  validateUser(email, password)
  console.log("still here")
  if (validateUser(email, password))
    res.json({
      success: true,
      token: JWT.sign(getUserFacadeByEmail(email), process.env.SECRET_KEY, {
        expiresIn: 3600
      })
    });
  else res.sendStatus(403);
})
export default router;