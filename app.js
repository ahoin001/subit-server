var createError = require('http-errors');
var express = require('express');

// var debug = require('debug')('app4')
let cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");

var indexRouter = require('./src/routes/index');
var userRouter = require('./src/routes/user.routes');
var projectsRouter = require('./src/routes/project.routes');
var subtitlesRouter = require('./src/routes/subtitles.routes');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// SESSION:
app.use(session({
  secret: "my-amazing-secret-blah",
  resave: true,
  saveUninitialized: true // don't save any sessions that doesn't have any data in them
}));

// 🚨🚨🚨 must come after the sessions 🚨🚨🚨
require('./configs/passport/passport.setup')(app);


app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/projects', projectsRouter);
app.use('/subtitles', subtitlesRouter);

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

app.set('port', process.env.PORT || 8000)

var server = app.listen(app.get('port'), function () {
  console.log(('Express server listening on port ' + server.address().port))
})
