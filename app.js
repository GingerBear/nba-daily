var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nib          = require('nib');
var hbs  = require('express-hbs');

var app = express();

// view engine setup
app.engine('hbs', hbs.express4({
    partialsDir:    __dirname + '/views/partials',
    defaultLayout:  __dirname + '/views/layouts/default.hbs',
    layoutsDir:     __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');
app.set('views', 'views');
app.hbs = hbs;

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require("connect-assets")({
    paths: [
        __dirname + '/assets/js',
        __dirname + '/assets/css'
    ],
    buildDir: '.built'
}, function (assetsInstance) {
    assetsInstance.environment.getEngines('.styl').configure(function (stylus) {
        stylus.use(nib()).import('nib');
        if (app.settings.env === 'development') {
            stylus.set('sourcemap', {inline: true});
        }
    });
}));

require('./lib/hbs-helpers')(app);

app.use(function(req, res, next) {
    if(/\.json$/.test(req.path)) {
        req.isJson = true;
        req.path = req.path.replace('.json', '');
        req.url = req.url.replace('.json', '');
        req.originalUrl = req.originalUrl.replace('.json', '')
    }
    if (req.xhr) {
        req.isJson = true;
    }
    return next();
});

app.use('/', require('./routes/index'));
app.use('/top-10', require('./routes/topTen'));
app.use('/teams', require('./routes/teams'));
app.use('/players', require('./routes/players'));
app.use('/video', require('./routes/video'));
app.use('/standings', require('./routes/standings'));

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
