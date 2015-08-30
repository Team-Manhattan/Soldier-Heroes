module.exports = function (app, passport) {
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });
    /*app.get('/*', function(req, res) {
        res.send('404');
    });*/
}
