var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const slowDown = require("express-slow-down");

var history = require('connect-history-api-fallback');
const hostname = 'localhost';
const port = 3000;
const storage = require('node-persist');
const bodyParser = require('body-parser');

const staticFileMiddleware = express.static(path.join(__dirname, '/dist/'));


var indexRouter = require('./routes/index');
var gpioRouter  = require('./routes/gpio');
var sharingRouter  = require('./routes/sharing');

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

app.use(bodyParser.json({ limit: '50mb' ,type:'application/json'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:5000000,type:'application/json'}));


//routes
app.use('/', indexRouter);
app.use('/gpio', gpioRouter);
app.use('/sharing', sharingRouter);

const speedLimiter = slowDown({
  windowMs: 2000, // 15 minutes
  delayAfter: 1, // allow 100 requests per 15 minutes, then...
  delayMs: 2000 // begin adding 500ms of delay per request above 100:
});


app.use(staticFileMiddleware);

app.use(history({
  index:'dist/index.html',
}));


app.get('*',async (req, res) => {

    res.sendFile(path.join(__dirname, 'dist/index.html'));
  
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
