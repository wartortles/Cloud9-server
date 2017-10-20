const db = require('../db/config');
const Search = {};
const axios = require('axios');


Search.populateResults = (req, res, next) => {
  const query = req.params.query;
  axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=geocode&&key=${process.env.PLACES_KEY}`)
  .then(response => {
    res.locals.results = response.data.predictions.map(prediction => {
      const result = {
        description: prediction.description,
        placeId: prediction.place_id
      }
      return result;
    });
    console.log(res.locals.results);
    next();
  });
}

Search.getLatLong = (req, res, next) => {
  const placeId = req.params.placeId
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${process.env.GEO_KEY}`)
  .then(response => {
    res.locals.latLong = response.data.results[0].geometry.location;
    console.log(res.locals.latLong);
    next();
  });
}


module.exports = Search;
