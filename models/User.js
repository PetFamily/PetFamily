const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  availability: { type: String, required: true },
  pricePerHour: {type: String, required: true },
 type: { type: String, required: true, enum: ['Adoption', 'Babysitting', 'Both', 'Other'] }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
