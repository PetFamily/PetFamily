const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adoptionCenterSchema = new Schema({
  name: { type: String, required: true, unique: true },
  ownerID: Schema.Types.ObjectId,
  description: { type: String, required: true },
  address: [
    {
      lat: Number,
      lng: Number,
      address: { type: String, required: true, unique: true }
    }
  ]
});

const adoptionCenter = mongoose.model('adoptionCenter', adoptionCenterSchema);
module.exports = adoptionCenter;
