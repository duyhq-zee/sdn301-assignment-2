var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const flash = require('connect-flash');

const User = require('./models/user.model');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const store = new MongoDBStore({
	uri: 'mongodb://localhost:27017/football',
	collection: 'sessions',
});

app.use(
	session({
		secret: 'My secret',
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);

app.use(flash());

app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	}
	User.findById(req.session.user._id)
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => console.log(err));
});

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	next();
});

const nationsRoute = require('./routes/nations.route');
const playersRoute = require('./routes/players.route');
const authRoute = require('./routes/auth.route');

app.use(authRoute);

app.use('/nations', nationsRoute);
app.use('/players', playersRoute);
app.use('/', (req, res, next) => {
	res.redirect('/nations');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
