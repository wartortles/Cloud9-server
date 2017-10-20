const pgp = require('pg-promise')();

const cn = {
	host: 'localhost',
	port: 5432,
	database: 'cloud_9',
	user: 'Drisdon'
}

const db = pgp(cn);


module.exports = db;
