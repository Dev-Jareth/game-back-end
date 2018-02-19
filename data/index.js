import mongoose from 'mongoose';
import { User } from './models';
const handle = (n, m) => e => {
  if (n >= m - 1) throw Error(`Failed to connect to mongodb ${m} times`, e)
  let f = () => tryConn(n + 1)(m)
  console.log(`Error - Retrying(${n + 1}):`, e.message);
  setTimeout(f, 1500)
}

const tryConn = (n = 0) => async (m = 3) => mongoose.connect(process.env.MONGO_CONNECTION).then().catch(handle(n, m))

tryConn()()

let newUser = new User({ username: "SJ", email: "seraphimjester@gmail.com", password: "hello world", admin: true })
newUser.save().then(()=>console.log("Succeeded to save"))
class NullUserError extends Error{
  constructor(m = "No User Returned"){
    super(m)
    this.name = "NullUserError"
  }
}
User.findOne({ username: "Bob" }).then(u => {
  if (!u) throw new NullUserError("No user from findOne")
  u.username = "Bob"
  u.save().then(() => console.log("Saved"))
}).catch(console.log);
// }
