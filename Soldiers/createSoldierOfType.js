function createSoldierByType(type) {
    "use strict";
    var imgPath;
    var requiredLvl;
    var damage;
    var defence;
    var price;
    var accuracy;
    var health;

    switch (type) {
        case constants.pistol:
            imgPath = '/Images/Player/pistol.png';
            requiredLvl = 1;
            price = 50;
            damage = 20;
            defence = 20;
            health = 100;
            accuracy = 20;
            break;
        case constants.medic:
            imgPath = '/Images/Player/medic.png';
            requiredLvl = 1;
            price = 50;
            damage = 15;
            defence = 25;
            health = 50;
            accuracy = 10;
            break;
        case constants.assaultRifle:
            imgPath = '/Images/Player/assaultRifle.png';
            requiredLvl = 1;
            price = 150;
            damage = 40;
            defence = 25;
            health = 120;
            accuracy = 32;
            break;
        case constants.sniper:
            imgPath = '/Images/Player/sniper.png';
            requiredLvl = 1;
            price = 250;
            damage = 60;
            defence = 10;
            health = 60;
            accuracy = 60;
            break;
        case constants.grenadier:
            imgPath = '/Images/Player/grenadier.png';
            requiredLvl = 2;
            price = 200;
            damage = 70;
            defence = 10;
            health = 80;
            accuracy = 20;
            break;
        default:
            throw new Error('No such type');
    }

    return barrack.createSoldier(imgPath, requiredLvl, price, damage, defence, health, accuracy, type);
}