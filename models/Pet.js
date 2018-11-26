const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: { type: String, required: true, unique: true },
  type: {
    type: String, required: true, enum: ["Dog", "Cat", "Other"]
  },
  description: { type: String, required: true },
  petPhoto: { type: String, required: true },
  age: { type: String, required: true },
  notes: { type: String, required: true },
  petPath: { type: String, required: true }
});


const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;

