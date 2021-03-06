const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const DBI = require('./db');
const port = process.env.PORT || 80

app.use(bodyParser.urlencoded({extended: true}));
var jsonParser = bodyParser.json()

var cors = require('cors');
app.use(cors());

DBI.initConnection();

// API Endpoints
require('./API/user')(app, jsonParser);

app.use(express.static('client'));


app.listen(port, () => {
    console.log(`API Webserver started on port ${port}`);
});




