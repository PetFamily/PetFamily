const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
<<<<<<< HEAD
  name: { type: String},
=======
  name: { type: String, required: true },
>>>>>>> master
  ownerID: { type: Schema.Types.ObjectId, ref: 'User' },
  type: {
    type: String, required: true, enum: ["Dog", "Cat", "Other"]
  },
  description: { type: String },
  vaccunationCompleted: Boolean,
  age: { type: String },
  notes: { type: String },
  petPhoto: { type: String },
  petPath: { type: String }
});


const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;

