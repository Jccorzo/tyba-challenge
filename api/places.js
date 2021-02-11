const axios = require('axios').default;

module.exports.getPlacesByLocation = async (location) => {
    const places = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=500&type=restaurant&key=AIzaSyDszkq4beA0qEj3gZt1w5qksMIGzQj_2vs`)
    const placesNames = places.data.results.map((place) => place.name)
    return placesNames
}
