import Mongoose from 'mongoose';

export const schema = new Mongoose.Schema({
  created_at: Date,
  updated_at: Date,
  name: { type: String, required: true, default: "Sabre" },
  hullCapacity: { type: Number, default: 100 },
  hullStrength: { type: Number, default: 100 },
  modelLocation: String,
  defensiveSlotsCount: { type: Number, required: true, default: 1 },
  offensiveSlotsCount: { type: Number, required: true, default: 1 },
  defensiveSlots: Array,
  offensiveSlots: Array
})

schema.pre('save', function(next) {
  let date = new Date()
  this.updated_at = date;
  if (!this.created_at) this.created_at = date;
  next()
})

export const Ship = Mongoose.model('Ship', schema)