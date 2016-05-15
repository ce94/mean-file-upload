process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
	mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	passport = require('./config/passport');

var db = mongoose(),
	app = express(),
	passport = passport();

app.listen(config.port);

//module.exports = app; // ??? Why is this?
console.log('ENV: ' + process.env.NODE_ENV + ' | SERVER: http://localhost:' + config.port + ' | DB: ' + config.db);