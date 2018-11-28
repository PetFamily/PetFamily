const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markerSchema = new Schema(

    {
        userLocationName: {type:Schema.Types.ObjectId, ref:'User'},
        coordinates : [{lng:Number, ltd: Number, ref:'User'}]
    },


    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    },
   

    

)

const Marker = mongoose.model('Marker',markerSchema);
module.exports = Marker;