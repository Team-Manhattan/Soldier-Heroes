var localStrategy = require('passport-local').Strategy;

//TODO
//var User = require('../app/models/user.js');

module.exports = function (passport) {
    /*passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            if (error) {
                throw error;
            }

            if (!user) {
                throw 'Deserialize: User not found!';
            }

            done(err, user);
        });
    });*/
}
