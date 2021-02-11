const placesServices = require('../services/locations');
const middlewares = require('../middlewares/validation');

module.exports = (app) => {

    app.post('/location', middlewares.validateGetPlaces, async (req, res) => {
        const location = req.body;
        try {
            const places = await placesServices.getPlacesByLocation(location)
            res.json({ places: places })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Ocurrió un error consultando los sitios" })
        }
    })

    app.get('/location/records', async (_, res) => {
        try {
            const records = await placesServices.getAllLocationRecords();
            res.json({ records })
        } catch (e) {
            res.status(400).json({ message: "Ocurrió un error consultando los registros" })
        }
    })
}