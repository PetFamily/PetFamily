const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userType: { type: String, enum: ["Adoption Center", "Individual"] },
  profilePic: { type: String },
  profilePath: String,
  availability: { type: String },
  pricePerHour: { type: String },
  centerDescription: { type: String },
  userLocationName: { type: String },
  address:
  {
    lat: Number,
    lng: Number
  },
  typeActivity: { type: String, enum: ['Adoption', 'Finder', 'Babysitting', 'Both'] },
  pets: [{type:Schema.Types.ObjectId, ref:'Pet'}],
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
