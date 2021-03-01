
/* File Name: app.css
Student Name: Sreelakshmi Chittaeth Pushpan
Student ID: 301170860
Date: 14 Feb 2020 */
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

//modules for authentication
let session = require('express-session');
let passport = require('passport');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');


//database setup 
let mongoose = require('mongoose'); 
let DB = require('./db'); 
//point mongoose to the DB URI 
mongoose.connect(DB.URI, {useNewUrlParser: true,useUnifiedTopology: true}); 
let mongoDB= mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error: '));
mongoDB.once('open',()=>{ console.log('Connected to mongoDB...'); });


let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let buisinesscontactRouter = require('../routes/userlist');
// const { passport } = require('passport');
let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules'))); //adding the path to node_modules

//setup Express session
app.use(session({
  secret: "someSecret",
  saveUninitialized: false,
  resave:false

}))

//Initialize flash
app.use(flash());

//Initialise passport
app.use(passport.initialize());
app.use(passport.session());




//create a user model instance
let userModel = require('../models/usermodel');
let User = userModel.userModel;

//implement a user Authentication Strategy
passport.use(User.createStrategy());

//serialize and deserialise the user input
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.Secret;

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
});

passport.use(strategy);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/buisiness-contact', buisinesscontactRouter);


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
