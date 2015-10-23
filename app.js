var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var db = require('./config/database.js');
var methodOverride = require('method-override');

var connect = function () {
  var options = {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  };
  mongoose.connect(db.dbConnectionString, options);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
mongoose.connection.on('open', function() {
  console.log('mongoDB is opening');
});

//models
require(path.join(__dirname, 'app/models/common/base_schema'));
fs.readdirSync(path.join(__dirname, 'app/models')).forEach(function (file) {
  if ( ~file.indexOf('.js') ) {
    require(path.join(__dirname, 'app/models', file));
  }
});

//controllers
var routes = require('./app/controllers/index');
var users = require('./app/controllers/users');
var homeController = require('./app/controllers/home_controller');
var blogController = require('./app/controllers/blog_controller');

var app = express();

app.locals.title = 'Node-Blog';

// view engine setup
app.set('views', path.join(__dirname,'app', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));
app.use(session({ secret: 'nb', key: 'node-blog', cookie: { maxAge: 3600000}}));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use('/', routes);
app.use('/users', users);
app.use('/home',homeController);
app.use('/blogs',blogController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
