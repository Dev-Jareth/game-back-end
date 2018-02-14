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

export const validateUser = (email, password) => email in users && users[email].password == password;
const getUserByEmail = email => users[email]
export const getUserFacadeByEmail = email => {
  let b = { ...getUserByEmail(email), password: undefined }
  console.log("Response: ", JSON.stringify(b))
  return b;
}