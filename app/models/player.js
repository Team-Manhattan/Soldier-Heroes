var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var playerSchema = mongoose.Schema({
    username: String,
    password: String,
    level: Number,
    exp: Number,
    money: Number,
    registerDate : Date,
    army : Array
});

playerSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

playerSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Player', playerSchema);
