import Mongoose from 'mongoose';

const schema = new Mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    sector: String,
    position: {
        x:Number,
        y:Number,
        z:Number
    },
    rotation: {
        x:Number,
        y:Number,
        z:Number
    },
    created_at: Date,
    updated_at: Date
})
schema.pre('save',function(next){
    let date = new Date()
    this.updated_at = date;
    if(!this.created_at) this.created_at = date;
    next()
})
export const User = Mongoose.model('User', schema)
