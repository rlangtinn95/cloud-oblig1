const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 80

app.use(bodyParser.urlencoded({extended: true}));
var jsonParser = bodyParser.json()

// API Endpoints
require('./API/user')(app, jsonParser);

app.use(express.static('client'));


app.listen(port, () => {
    console.log(`API Webserver started on port ${port}`);
});




