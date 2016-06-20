var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	passport = require('passport'),
	flash = require('connect-flash'),
	session = require('express-session');

module.exports = function() {
	var app = express();

	app.use(express.static('./public'));

	app.use(bodyParser.urlencoded({
		extended: true,
    limit: '10mb'
	}));

	app.use(bodyParser.json({
    limit: '5mb'
  }));

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: 'OurSuperSecretCookieSecret'
	}));

	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/todos.server.routes.js')(app);

	return app;
};
