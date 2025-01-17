const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { sequelize } = require('./db/models');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// routers here
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const the_api = require('./routes/api');
const episodeRouter = require('./routes/episode')
const podsRouter = require('./routes/pod');
const search = require('./routes/search');
const genres = require('./routes/genres');


const { sessionSecret } = require('./config');
const { restoreUser } = require("./auth")
const { User } = require('./db/models')
const app = express();

// view engine setup
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(sessionSecret));
app.use(express.static(path.join(__dirname, 'public')));


// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: sessionSecret,
    store,
    saveUninitialized: false,
    resave: false,
  })
);

// create Session table if it doesn't already exist
store.sync();
app.use(restoreUser)
app.use('/', indexRouter);
app.use('/me', usersRouter);
app.use('/api', the_api);
app.use('/podcasts', podsRouter);
app.use("/search", search);
app.use("/genres", genres);
app.use('/episode', episodeRouter);





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
