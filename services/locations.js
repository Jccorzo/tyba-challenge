const placesApi = require('../api/places');
const Location = require('../models/location');
module.exports.getPlacesByLocation = async (location) => {
    const places = await placesApi.getPlacesByLocation(location)
    await new Location({ ...location, places }).save()
    return places;
} 

module.exports.getAllLocationRecords = async () => await Location.find() 