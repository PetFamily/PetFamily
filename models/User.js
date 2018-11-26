const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  availability: { type: String, required: true },
  pricePerHour: { type: String, required: true },
  userType: { type: String, enum: ["Adoption Center", "Individual"] },
  description: { type: String, required: true },
  userLocationName:{type: String, required:true},
  address:
  {
    lat: Number,
    lng: Number,
    address: { type: String, required: true, unique: true }
  },
  typeActivity: { type: String, required: true, enum: ['Adoption', 'Finder', 'Babysitting', 'Both'] }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
