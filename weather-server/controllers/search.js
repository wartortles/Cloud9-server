const express = require('express');
const router = express.Router();

const Search = require('../models/search');
const Weather = require('../models/weather');

// get lat and long and then save to DB
router.post('/geocode/:placeId',
  Search.getLatLong,
  Weather.createFromSearch,
  (req, res) => {
    res.json({
      location: res.locals.latLong,
      name: res.locals.name
    });
});

router.get('/single/:query',
  Search.getFirstResult,
  Search.getLatLongForInput,
  Weather.createFromSearch,
	(req, res) => {
		res.json({
			location: res.locals.latLong,
      name: res.locals.name
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
