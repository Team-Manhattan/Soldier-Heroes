require('ejs');
var express = require('express'),
    app = express(),
    config = require('./config/server-config.js'),
    port = process.env.PORT || 8080,
    mongoose = require('mongoose'),
    db = mongoose.connect(config.db.url),
    passport = require('passport'),
    flash = require('flash'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    path = require('path');
    //config = require('./config.js');

//TODO
//require('./config/passport.js')(passport);

app.use(morgan('dev')); //logs every request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
//app.use(cookieParser); //reads cookies for authentication

//required for passport
app.use(session({secret: 'thequickbrownfoxjumpsovertherabbit',
                saveUninitialized: true,
                resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/router.js')(app, passport);

app.set('views', path.join(__dirname));

app.set('view-engine', 'ejs');

app.use(express.static(__dirname));

app.listen(port);

console.log('Server is listening on port: ' + port);
