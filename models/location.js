const mongoose = require('mongoose');

const PlacesSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    places: [ String ],
})

module.exports = mongoose.model('Places', PlacesSchema);