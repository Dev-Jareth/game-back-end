import Mongoose from 'mongoose';

export const schema = new Mongoose.Schema({
    name: { type: String, required: true, default: "Sabre" },
    hullCapacity: { type: Number, default: 100 },
    hullStrength: { type: Number, default: 100 },
    modelLocation: String,
    defensiveSlotsCount: { type: Number, required: true, default: 1 },
    offensiveSlotsCount: { type: Number, required: true, default: 1 },
    defensiveSlots: Array,
    offensiveSlots: Array
})

export const Ship = Mongoose.model('Ship', schema)