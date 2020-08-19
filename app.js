const express = require('express');
const path = require('path');
var logger = require('morgan');

var indexRouter = require('./route/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use(function(err, req, res, next) {
    next(err);
  });

app.listen(80,() => {
    console.log('server is running...');
});