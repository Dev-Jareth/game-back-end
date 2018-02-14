import JWT from 'jsonwebtoken';

export const validateTokenMiddleware = (req, res, next) => {
  let token = req.body.token || req.headers['token'] || req.headers['Authorization'];
  if (!token) res.status(499).send("JWT Token Required");
  JWT.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) res.status(498).send("Invalid Token");
    else next();
  })
}
const users = {
  "name@mail.com": {
    "password": "password",
    "displayName": "FreddoBar",
    "unit": "m",
    "coords": {
      "x": 0,
      "y": 0,
      "z": 0
    },
    "rotation": {
      "x": 0,
      "y": 0,
      "z": 0
    }
  },
  "credits": 1000,
  "xp": 500
}

const validateUser = (email, password) => email in users && users[email].password == password;
const getUserByEmail = email => users[email]
const getUserFacadeByEmail = email => {
  let b = { ...getUserByEmail(email), password: undefined }
  console.log("Response: ", JSON.stringify(b))
  return b;
}

export const loginUser = (req, res, next) => {

  let email = req.body.email;
  let password = req.body.password;
  if (validateUser(email, password))
    res.json({
      success: true,
      token: JWT.sign(getUserFacadeByEmail(email), process.env.SECRET_KEY, {
        expiresIn: 3600
      })
    });
  else res.sendStatus(403);
}