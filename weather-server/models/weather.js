const db = require('../db/config');
const Weather = {};
const axios = require('axios');

Weather.findAll = (req, res, next) => {
  db.many('SELECT * FROM locations').then((savedAll) => {
    res.locals.savedAll = savedAll;
    next();
  }).catch(err => {
    console.log(`ERROR retrieving ALL: ${err}`)
  });
};

Weather.findById = (req, res, next) => {
  const {id} = req.params;
  db.oneOrNone(`SELECT * FROM locations WHERE id=$1`, [id]).then((single) => {
    res.locals.single = single;
    next();
  }).catch(err => {
    console.log(`ERROR grabbing SINGLE location: ${err}`);
  });
};

Weather.create = (req, res, next) => {
  const {name, latitude, longitude} = req.body;
  db.one(`INSERT INTO locations (name, latitude, longitude)
		VALUES ($1, $2, $3) RETURNING *`, [name, latitude, longitude]).then(newAdd => {
    res.locals.newAdd = newAdd;
    next();
  }).catch(err => {
    console.log(`ERROR adding NEW: ${err}`)
  });
};

Weather.createFromSearch = (req, res, next) => {
  const name = res.locals.name,
		latitude = res.locals.latLong.lat,
    longitude = res.locals.latLong.lng;
  db.one(`INSERT INTO locations (name, latitude, longitude)
		VALUES ($1, $2, $3) RETURNING *`, [name, latitude, longitude]).then(newAdd => {
    res.locals.newAdd = newAdd;
    next();
  }).catch(err => {
    console.log(`ERROR adding NEW: ${err}`)
  });
};

Weather.destroy = (req, res, next) => {
  const {id} = req.params;
  db.none(`DELETE FROM locations WHERE id=$1`, [id]).then(() => next()).catch(err => {
    console.log(`ERROR DELETING: ${err}`)
  });
};

Weather.darkSky = (req, res, next) => {
  const weatherData = [];
  //console.log(res.locals.savedAll);
  res.locals.savedAll.forEach((location) => {
    const url = `https://api.darksky.net/forecast/62c93130d056ac7bc470247fc5a1fc80/${location.latitude},${location.longitude}`;
    //console.log(url);
    const weather = axios.get(`https://api.darksky.net/forecast/62c93130d056ac7bc470247fc5a1fc80/${location.latitude},${location.longitude}`)
    weatherData.push(weather);
  })

  axios.all(weatherData).then(responses => {
    responses = responses.map(response => response.data);
  //  console.log(responses);
    res.locals.weatherData = responses;
    next();
  })
}

Weather.darkSkyOne = (req, res, next) => {
	const weatherData = [];
	const location = res.locals.single
	axios.get(`https://api.darksky.net/forecast/62c93130d056ac7bc470247fc5a1fc80/${location.latitude},${location.longitude}`)
	.then(response => {
		res.locals.weatherData = response.data
		next();
	})
}


module.exports = Weather;
