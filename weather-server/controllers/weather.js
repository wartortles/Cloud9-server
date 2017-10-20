const express = require('express');
const router = express.Router();

const Weather = require('../models/weather');

router.get('/', Weather.findAll,
	(req, res) => {
		res.json({
			weather: res.locals.savedAll
		});
	});


router.get('/:id', Weather.findById,
	(req, res) => {
		res.json({
			weather: res.locals.single
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