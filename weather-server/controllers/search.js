const express = require('express');
const router = express.Router();

const Search = require('../models/search');
const Weather = require('../models/weather');

router.get('/geocode/:placeId',
  Search.getLatLong,
  Weather.createFromSearch,
  (req, res) => {
    res.json({
      results: res.locals.latLong
    });
});

router.get('/:query',
  Search.populateResults,
	(req, res) => {
		res.json({
			results: res.locals.results
		});
	});



module.exports = router;
