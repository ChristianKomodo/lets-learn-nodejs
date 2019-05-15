var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
require('dotenv').config()
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

// Routes
var indexRouter = require('./routes/index');
var yesnoRouter = require('./routes/yesno');
var randomUserRouter = require('./routes/randomUser');
var omdbRouter = require('./routes/omdb');
var formRouter = require('./routes/form');
var ajaxRouter = require('./routes/ajax');
var referencesRouter = require('./routes/references');
var movieSearchRouter = require('./routes/movieSearch');
var movieQuizRouter = require('./routes/movieQuiz');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	sassMiddleware({
		src: path.join(__dirname, 'public'),
		dest: path.join(__dirname, 'public'),
		indentedSyntax: false,
		sourceMap: false
	})
);
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/', indexRouter);
app.use('/yesno', yesnoRouter);
app.use('/randomuser', randomUserRouter);
app.use('/omdb', omdbRouter);
app.use('/form', formRouter);
app.use('/ajax', ajaxRouter);
app.use('/references', referencesRouter);
app.use('/movie-search', movieSearchRouter);
app.use('/movie-quiz', movieQuizRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
