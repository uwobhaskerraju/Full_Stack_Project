//import libraries
const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

var port=process.env.PORT || 8080

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Ending the Process', err);
    process.exit();
});

// create the router object
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log("This route was requested: "+req.url);
    next(); // make sure we go to the next routes and don't stop here
});

// define a default route
router.get('/', (req, res) => {
    //console.log('default works')
    res.send({success:"true"})
});

// all our APIs will have default name '/api' in route
app.use('/api', router);

// import other routes from 'app' folder.
require('./app/routes/secure.route.js')(router);
require('./app/routes/open.route.js')(router);


// listen for requests

app.listen(port, () => {
    console.log("Server is listening on port "+port);
});