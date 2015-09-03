/*globals constants, validator*/
function generateId() {
    "use strict";
    var id = '';

    for (var i = 0, constraint = constants.LENGTH_OF_ID; i < constraint; i += 1) {
        id += ((Math.random() * 9) | 0) + '';
    }

    return id;
}

// TODO : might be an IIFE
var getPlayer = (function getPlayer() {
    "use strict";

    var myModule = (function () {

        var player = (function () {

            var player = Object.create({});

            Object.defineProperties(player, {
                newPlayer: {
                    value: function (nameOfPlayer,
                                     passwordOfPlayer,
                                     levelOfPlayer,
                                     expOfPlayer,
                                     moneyOfPlayer,
                                     registerDayOfPlayer,
                                     armyOfPlayer) {
                        this.namePl = nameOfPlayer;
                        this.password = passwordOfPlayer;
                        this.id = generateId();
                        this.level = levelOfPlayer;
                        this.exp = expOfPlayer;
                        this.money = moneyOfPlayer;
                        this.dataOfRegistration = registerDayOfPlayer;
                        this.army = armyOfPlayer;
                        return this;
                    }
                },

                /*not "name" because overriding jspm property*/
                namePl: {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        validator.validateCorrectStringName(value);
                        this._name = value;
                    }
                },

                password: {
                    get: function () {
                        return this._password;
                    },
                    set: function (value) {
                        validator.validateCorrectPassword(value);
                        this._password = value;
                    }
                },

                id: {

                    get: function () {
                        return this._id;
                    },
                    set: function (value) {
                        validator.correctID(value);
                        validator.isAllDigits(value);
                        this._id = value;
                    }
                },

                level: {
                    get: function () {
                        return this._level;
                    },
                    set: function (value) {
                        validator.isAllDigits(value);
                        validator.positiveNumber(value);
                        this._level = value;
                    }
                },

                exp: {
                    get: function () {
                        return this._expiriance;
                    },
                    set: function (value) {
                        validator.isAllDigits(value);
                        validator.positiveNumber(value);
                        this._expiriance = value;
                    }
                },

                money: {
                    get: function () {
                        return this._money;
                    },
                    set: function (value) {
                        validator.isAllDigits(value);
                        validator.correctMoney(value);
                        this._money = value;
                    }
                },

                dataOfRegistration: {
                    get: function () {
                        return this._dateOfRegistration;
                    },
                    set: function (value) {
                        /*validate*/
                        this._dateOfRegistration = value;
                    }
                },

                army: {
                    get: function () {
                        return this._army;
                    },
                    set: function (value) {
                        /*validate array!*/
                        this._army = value;
                    }
                }
            });

            return player;
        }());
        return {
            createPlayer: function (name, pass, level, exp, money, regDay, army) {
                return Object.create(player).newPlayer(name, pass, level, exp, money, regDay, army);
            }
        };
    }());
    return myModule;
})();