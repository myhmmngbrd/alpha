const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./route/index');
const forumRouter = require('./route/forum');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/forum', forumRouter);

app.use(function(err, req, res, next) {
    next(err);
  });

app.listen(80,() => {
    console.log('server is running...');
});