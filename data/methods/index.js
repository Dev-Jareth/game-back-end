import { User, Ship, Planet } from '../models'
import bcrypt from 'bcrypt'

const comparePassword = password => async user => user ? await bcrypt.compare(password, user.password) ? user._id : false : false; //change for bcrypt
const methods = {}
const starterShip = () => new Ship({ name: "Sabre" })

methods.addUser = async data => await new User({ ...data, ship: starterShip() }).save().then(() => true)
methods.addPlanet = async data => await new Planet({ ...data }).save().then(() => true)
methods.getAllPlanets = async () => Planet.find({})
methods.getUserById = async id => User.findById(id)
methods.login = async data => User.findOne({ email: data.email }).then(await comparePassword(data.password))

export { methods }