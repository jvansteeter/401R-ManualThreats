var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var busboy = require('express-busboy');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// setup passport
var configAuth = require('./config/auth.js');
app.use(session({secret: configAuth.session.secret, 
                 resave: true,
                 saveUninitialized: true 
               }));
app.use(passport.initialize());
app.use(passport.session());

// setup models and configurations
require('./config/passport');

// setup routes
var indexRouter = require("./routes/index");
var authRouter = require("./routes/authorizationRouter");
// var api = require('./routes/api');
var etc = require('./routes/etcAPI');

// uncomment after placing your favicon in /public
app.use(favicon('public/image/favicon.ico'));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
busboy.extend(app, {
    upload: true,
    path: '/upload',
    allowedPath: /./
});

// Routes
app.use('/', indexRouter);
app.use('/login', express.static('views/login.html'));
app.use('/home', isLoggedIn, express.static('views/home.html'));
app.use('/auth', authRouter);
// app.use('/api', isAuthenticated, api);
app.use('/api', isAuthenticated, etc);

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development')
// {
//     app.use(function(err, req, res, next)
//     {
//         res.status(err.status || 500);
//         res.render('error',
//         {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next)
// {
//     res.status(err.status || 500);
//     res.render('error',
//     {
//         message: err.message,
//         error: {}
//     });
// });

function isLoggedIn(req, res, next)
{
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
    {
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/login');
}

function isAuthenticated(req, res, next)
{
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
    {
        return next();
    }
    // if they aren't redirect them to the home page
    res.sendStatus(401);
}

module.exports = app;
