import { User } from '../models'
import bcrypt from 'bcrypt'

const comparePassword = password => async user => user?await bcrypt.compare( password, user.password)?user._id:false:false;//change for bcrypt
const methods = {}


methods.addUser = async data => await new User({ ...data }).save().then(() => true)
methods.getUserById = async id=> User.findById(id).then(console.log)
methods.login = async data => User.findOne({ email: data.email }).then(await comparePassword(data.password))

export { methods }