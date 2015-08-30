var singleSoldier = (function(){
        "use strict";
     let soldier = (function () {
        let soldier = Object.create({});

        Object.defineProperties(soldier, {
            newSoldier: {
                value: function (imagePath,
                                 neededLevel,
                                 priceMoney,
                                 soldierDamage,
                                 soldierDefence,
                                 soldierHealth,
                                 soldierAccuracy,
                                 soldierType) {
                    this.image = imagePath;
                    this.requiredLvl =neededLevel;
                    this.price = priceMoney;
                    this.damage = soldierDamage;
                    this.defence = soldierDefence;
                    this.hitPoints = soldierHealth;
                    this.accuracy = soldierAccuracy;
                    this.typeOfSoldier = soldierType;
                    return this;
                }
            },

            image :{
                get: function(){
                    return this._image;
                },
                set: function (value) {
                    this._image = value;
                }
            },

            requiredLvl: {
                get: function(){
                    return this._requiredLevel;
                },
                set: function (value) {
                    this._requiredLevel = value;
                }
            },

            price: {
                get: function(){
                    return this._price;
                },
                set: function (value) {
                    this._price = value;
                }
            },

            damage: {
                get: function(){
                    return this._damage;
                },
                set: function (value) {
                    this._damage = value;
                }
            },

            defence: {
                get: function(){
                    return this._defence;
                },
                set: function (value) {
                    this._defence = value;
                }
            },

            hitPoints: {
                get: function(){
                    return this._health;
                },
                set: function (value) {
                    this._health = value;
                }
            },

            accuracy: {
                get: function(){
                    return this._accuracy;
                },
                set: function (value) {
                    this._accuracy = value;
                }
            },

            /*type was not wokring*/
            typeOfSoldier: {
                get: function(){
                    return this._type;
                },
                set: function (value) {
                    this._type = value;
                }
            }
        });

        return soldier;
    }());

    return {
        createSoldier: function (imagePath, neededLevel, priceMoney, soldierDamage, soldierDefence, soldierHealth, soldierAccuracy, soldierType) {
            return Object.create(soldier).newSoldier(imagePath, neededLevel, priceMoney, soldierDamage, soldierDefence, soldierHealth, soldierAccuracy, soldierType);
        }
    };

}());

export default {
    singleSoldier: singleSoldier
}