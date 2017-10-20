const db = require('../db/config');
const Weather = {};

Weather.findAll = (req, res, next) => {
	db.many('SELECT * FROM locations')
	.then((savedAll) => {
		res.locals.savedAll = savedAll;
		next();
	})
	.catch(err => {
		console.log(`ERROR retrieving ALL: ${err}`)
	});
};


Weather.findById = (req, res, next) => {
	const { id } = req.params;
	db.oneOrNone(`SELECT * FROM locations WHERE id=$1`, [id])
	.then((single) => {
		res.locals.single = single;
		next();
	})
	.catch(err => {
		console.log(`ERROR grabbing SINGLE location: ${err}`);
	});
};


Weather.create = (req, res, next) => {
	const { latitude, longitude } = req.body;
	db.one(`INSERT INTO locations (latitude, longitude) 
		VALUES ($1, $2) RETURNING *`, [latitude, longitude])
	.then(newAdd => {
		res.locals.newAdd = newAdd;
		next();
	})
	.catch(err => {
		console.log(`ERROR adding NEW: ${err}`)
	});
};


Weather.destroy = (req, res, next) => {
	const { id } = req.params;
	db.none(`DELETE FROM locations WHERE id=$1`, [id])
	.then(() => next())
	.catch(err => {
		console.log(`ERROR DELETING: ${err}`)
	});
};


module.exports = Weather;