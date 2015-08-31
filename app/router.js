module.exports = function (app, passport) {
    app.get('/', function(req, res) {
        console.log('ASDASDSAD: ' + req.user);
        res.render('index.ejs', {
            message: req.flash('server-message'),
            player: req.user
        });
    });

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: 'back',
        failureFlash: true //allow flash messages
    }), function (req, res) {
        res.redirect('/');
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: 'back',
        failureFlash: true
    }), function (req, res) {
        res.send('ASD');
    });

    app.get('/profile', function(req, res) {
        res.render('./views/profile.ejs', {
            player: req.user
        });
    });
}
