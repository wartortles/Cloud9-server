const pgp = require('pg-promise')();

const cn = {
	host: 'localhost',
	port: 5432,
	database: 'weather-app',
	user: 'matthewkim'
}

const db = pgp(cn);


module.exports = db;