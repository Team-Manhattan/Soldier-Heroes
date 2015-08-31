var localStrategy = require('passport-local').Strategy;

var Player = require('../app/models/player.js');

module.exports = function (passport) {
    // =========================================================================
   // passport session setup ==================================================
   // =========================================================================
   // required for persistent login sessions
   // passport needs ability to serialize and unserialize users out of session

   passport.serializeUser(function (player, done) {
       done(null, player.id);
   });

   passport.deserializeUser(function (id, done) {
       Player.findById(id, function (err, player) {
           done(err, player);
       })
   });

   passport.use('local-signup', new localStrategy({
       usernameField: 'username',
       passwordField: 'password',
       passReqToCallback: true // allows us to pass back the entire request to the callback
   }, function (req, username, password, done) {
       process.nextTick(function () {
           Player.findOne({'username': username}, function (err, player) {
               if (err) {
                   return done(err);
               }

               //check to see if there is already a user with that email
               if (player) {
                   return done(null, false, req.flash('server-message', 'That username has already been taken.'));
               } else {
                   var newPlayer = new Player();
                   newPlayer.username = username;
                   newPlayer.password = newPlayer.generateHash(password);
                   newPlayer.level = 1;
                   newPlayer.exp = 1;
                   newPlayer.money = 100;
                   newPlayer.registerDate = new Date();
                   newPlayer.army = [];

                   newPlayer.save(function (err) {
                       if (err) {
                           throw err;
                       }

                       return done(null, newPlayer);
                       res.send(newPlayer);
                   });
               }
           });
       })
   }));

   passport.use('local-login', new localStrategy({
       usernameField: 'username',
       passwordField: 'password',
       passReqToCallback: true
   },
    function (req, username, password, done) {
        Player.findOne({'username': username}, function (err, player) {
            if (err) {
                return done(err);
            }

            if (!player) {
                return done(null, false, req.flash('server-message', 'No player found.'));
            }

            if (!player.validatePassword(password)) {
                return done(null, false, req.flash('server-message', 'Wrong password.'));
            }
            return done(null, player);
        });
    }))
}
