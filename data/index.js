import mongoose from 'mongoose';
import { User } from './models';
import { methods } from './methods';

const handle = (n, m) => e => {
  if (n >= m - 1) throw Error(`Failed to connect to mongodb ${m} times`, e)
  console.log(`Error - Retrying(${n + 1}):`, e.message);
  setTimeout(() => tryConn(n + 1)(m), 1500)
}

const tryConn = (n = 0) => async (m = 3) => mongoose.connect(process.env.MONGO_CONNECTION).then(()=>console.log("Connected to database at "+process.env.MONGO_CONNECTION)).catch(handle(n, m))

// methods.addUser({ username: "SJ", email: "seraphimjester@gmail.com", password: "hello world", admin: true }).then(console.log).catch()
export default methods;
export const connect = async () => tryConn()()