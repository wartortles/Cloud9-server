const express = require('express');
const router = express.Router();

const Weather = require('../models/weather');


router.get('/', Weather.findAll, Weather.darkSky,
	(req, res) => {
		res.json({
			locations: res.locals.savedAll,
			weatherData: res.locals.weatherData
		});
	});


router.get('/:id', Weather.findById, Weather.darkSkyOne,
	(req, res) => {
		res.json({
			location: res.locals.single,
			weather: res.locals.weatherData
		});
	});




router.post('/', Weather.create,
	(req, res) => {
		res.json({
			weather: res.locals.newAdd
		});
	});


router.delete('/:id', Weather.destroy,
	(req, res) => {
		res.send('deleted')
	});



module.exports = router;
