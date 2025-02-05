var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');  //1
const {connectToMongoDB} = require('./db/db.js')
const logMiddleware = require('./middlewares/logsMiddlewares.js');
const session = require('express-session');

require("dotenv").config();

var indexRouter = require('./routes/index');
var osRouter = require('./routes/os.js');
var carsRouter = require('./routes/carsRouter.js');
var usersRouter = require('./routes/usersRouter.js');
var authRouter = require('./routes/authRouter.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logMiddleware)

app.use(session({
  secret: process.env.Net_Secret,
  resave:false,
  saveUninitialized:true,
  cookie: {
    secure: false,
    maxAge: 24 * 60 *60 *1000
  }
}))

app.use('/', indexRouter);
app.use('/cars', carsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/os', osRouter);

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

const server = http.createServer(app);  //2
server.listen(process.env.Port,() => {connectToMongoDB(),console.log('app is running on port 5000')}); //3