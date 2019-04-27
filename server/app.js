var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const slowDown = require("express-slow-down");
const bodyParser = require('body-parser');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gpioRouter  = require('./routes/gpio');
var workspaceRouter  = require('./routes/workspace');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Tell the bodyparser middleware to accept more data
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gpio', gpioRouter);
app.use('/workspace', wworkspaceRouter);

const speedLimiter = slowDown({
  windowMs: 2000, // 15 minutes
  delayAfter: 1, // allow 100 requests per 15 minutes, then...
  delayMs: 2000 // begin adding 500ms of delay per request above 100:
});

app.use(speedLimiter);

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



// SOCKET
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.set('socketio', io);
server.listen(3001);


module.exports = app;
