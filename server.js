const express 	= require('express');
const app       = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const mongoooseOptions = {
	useMongoClient: true,
	socketTimeoutMS: 0,
	keepAlive: true,
	reconnectTries: 30
  };

const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./app/configuration/configauth'); // get our config file

const port = process.env.PORT || 3099;
mongoose.connect(config.mongo, mongoooseOptions); // connect to database

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('./public'));

const authCheckMiddleware = require('./app/configuration/auth-check');
const apiRoutes = require('./app/routes/api')(express);
app.use('/api', authCheckMiddleware, apiRoutes);

const authRoutes = require('./app/routes/auth');
app.use('/auth', authRoutes);

require('./app/routes/routes.js')(app);
app.listen(port);

