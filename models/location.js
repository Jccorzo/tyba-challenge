const mongoose = require('mongoose');

const PlacesSchema = mongoose.Schema({
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    places: [ String ],
})

module.exports = mongoose.model('Places', PlacesSchema);