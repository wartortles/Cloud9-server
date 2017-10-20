const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const controller = require('./controllers/weather');
const searchController = require('./controllers/search');

require('dotenv').config()


const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/weather', controller);
app.use('/search', searchController);

app.listen(port, () => { console.log("Server started on " + port); });
