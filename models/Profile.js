const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  ownerId: {type: Schema.Types.ObjectId, ref:"User"},
  availability: { type: String, required: true },
  pricePerHour: { type: String, required: true },
  description: { type: String, required: true },
  userLocationName:{type: String, required:true},
  address:
  {
    lat: Number,
    lng: Number
  },
  typeActivity: { type: String, required: true, enum: ['Adoption', 'Finder', 'Babysitting', 'Both'] }
})

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;

