import constants from './constants.js';
import validator from './validator.js';

function generateId() {
    "use strict";
    let id = '';

    for (let i = 0, constraint = constants.LENGTH_OF_ID; i < constraint; i += 1) {
        id += ((Math.random() * 9) | 0)+ '';
    }

    return id;
}

function bigPlayer() {
    "use strict";

    let myModule = (function () {

        let player = (function () {

            let player = Object.create({});

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
                        validator.positiveNumber(value);
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
            getPlayer: function (name, pass,level, exp, money,regDay, army) {
                return Object.create(player).newPlayer(name, pass,level, exp, money,regDay, army);
            }
        };
    }());
    return myModule;
}

/*let a = bigPlayer();
let afdsa = a.getPlayer();
afdsa.army = 2;*/
export default {
    bigPlayer
}