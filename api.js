var express = require('express');
var path = require('path');
var fs = require('fs');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = require('./config/database.js');
var CnodejsAuth = require('./lib/auth/cnodejs_auth.js');

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

var api = express();

api.set('views', path.join(__dirname, 'app/api', 'views'));
api.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
api.use(logger('dev'));
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));

api.use(function(req, res, next) {
  CnodejsAuth(req,next);
});

var cnodejsApi = require('./app/api/cnodejs_api');
api.use('/api/cnodejs', cnodejsApi);

// catch 404 and forward to error handler
api.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (api.get('env') === 'development') {
  api.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
api.use(function(err, req, res, next) {
  res.status(err.status || 500);
  /*res.render('error', {
    message: err.message,
    error: {}
  });*/
});


module.exports = api;
