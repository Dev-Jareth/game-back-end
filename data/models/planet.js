import Mongoose from 'mongoose';

const schema = new Mongoose.Schema({
  name: { type: String, required: true, unique: true },
  radius: { type: Number, default: 100, required: true },
  classification: { type: String, default: "M" },
  coords: {
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
  updated_at: Date
})

schema.pre('save', function(next) {
  let date = new Date()
  this.updated_at = date;
  if (!this.created_at) this.created_at = date;
  next()
})

export const Planet = Mongoose.model('Planet', schema)