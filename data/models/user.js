import Mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { schema as shipSchema } from './ship'

const schema = new Mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    sector: String,
    ship: shipSchema,
    position: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        z: { type: Number, default: 0 }
    },
    rotation: {
        x: { type: Number, default: 0 },
        y: { type: Number, default: 0 },
        z: { type: Number, default: 0 }
    },
    created_at: Date,
    updated_at: Date,
    credits: { type: Number, default: 0 },
    xp: { type: Number, default: 0 }
})
schema.pre('save', function (next) {
    let date = new Date()
    this.updated_at = date;
    if (!this.created_at) this.created_at = date;
    next()
})
schema.path('password').set(function (v) {
    return bcrypt.hashSync(v, 10)
});
export const User = Mongoose.model('User', schema)
