var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var admin = require('./routes/admin')
var auth = require('./routes/auth');
const userDao = require('./dao/login.dao')
var usersRouter = require('./routes/users');
const db = require("./config/DBConnection");
const suscriptor = require("./public/js/notification");
const { error } = require('console');
const { Subject } = require('rxjs');
const flash = require('express-flash');

const cron = require('node-cron');
const usere = new userDao();
cron.schedule('* * * * * *', async () => {
    //console.log('Ejecutando búsqueda y procesamiento de notificaciones...');
    const noti = await usere.getUserNotiByUsername(global.username);
    if(noti != global.notificacion){
      global.banderanoti = true
    }else{
      global.banderanoti = false
    }
    //console.log(noti);
  });

var app = express();
db.connect();
suscriptor.asObservable();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, "/public")));

app.use((req, res, next) => {
  // res.locals.status = req.flash("status");
  // res.locals.register = req.flash("register");
  // res.locals.login = req.flash("login");
     res.locals.loginUser = req.userId;
  // res.locals.success = req.flash("success");
  // res.locals.error = req.flash("error");
  next();
});
app.use(auth);
app.use(admin);
app.use(usersRouter);

app.use(
  session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
  })
);
// Configura el middleware de flash messages
app.use(flash());
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
  res.render('error/error', {status: err});
  console.log(err)
});

module.exports = app;
