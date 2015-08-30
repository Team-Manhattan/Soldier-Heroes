import $ from 'jquery';
import constants from '../Libraries/constants.js';
import '../Libraries/External/jquery-ui.js';

function loadShop(forUser) {
    "use strict";
    let $table = $('<table cellspacing="0" cellpadding="0"/>');
    let $row = $('<tr />');
    let lockedPath = 'Images/locked.png';
    let arrImages = [{
        imgPath: '/Images/Player/assaultRifle.png',
        requiredLvl: 1,
        price: 150,
        damage: 40,
        defence: 25,
        hitPoints: 120,
        accuracy: 33,
        type: 'assault'
    }, {
        imgPath: '/Images/Player/medic.png',
        requiredLvl: 1,
        price: 50,
        damage: 5,
        defence: 25,
        hitPoints: 50,
        accuracy: 10,
        type: 'medic'
    }, {
        imgPath: '/Images/Player/pistol.png',
        requiredLvl: 1,
        price: 50,
        damage: 15,
        defence: 20,
        hitPoints: 100,
        accuracy: 20,
        type: 'pistol'
    }, {
        imgPath: '/Images/Player/sniper.png',
        requiredLvl: 1,
        price: 250,
        damage: 60,
        defence: 10,
        hitPoints: 60,
        accuracy: 100,
        type: 'sniper'
    }, {
        imgPath: '/Images/Player/grenadier.png',
        requiredLvl: 2,
        price: 200,
        damage: 70,
        defence: 8,
        hitPoints: 80,
        accuracy: 20,
        type: 'grenadier'
    }, {
        imgPath: '/Images/Player/grenadier.png',
        requiredLvl: 2,
        price: 200,
        damage: 70,
        defence: 8,
        hitPoints: 80,
        accuracy: 20,
        type: 'grenadier'
    }, {
        imgPath: '/Images/Player/grenadier.png',
        requiredLvl: 2,
        price: 200,
        damage: 70,
        defence: 8,
        hitPoints: 80,
        accuracy: 20,
        type: 'grenadier'
    }, {
        imgPath: '/Images/Player/grenadier.png',
        requiredLvl: 2,
        price: 200,
        damage: 70,
        defence: 8,
        hitPoints: 80,
        accuracy: 20,
        type: 'grenadier'
    }, {
        imgPath: '/Images/Player/grenadier.png',
        requiredLvl: 2,
        price: 200,
        damage: 70,
        defence: 8,
        hitPoints: 80,
        accuracy: 20,
        type: 'grenadier'
    }, {
        imgPath: '/Images/Player/grenadier.png',
        requiredLvl: 2,
        price: 200,
        damage: 70,
        defence: 8,
        hitPoints: 80,
        accuracy: 20,
        type: 'grenadier'
    }, {
        imgPath: '/Images/Player/grenadier.png',
        requiredLvl: 2,
        price: 200,
        damage: 70,
        defence: 8,
        hitPoints: 80,
        accuracy: 20,
        type: 'grenadier'
    }, {
        imgPath: '/Images/Player/grenadier.png',
        requiredLvl: 2,
        price: 200,
        damage: 70,
        defence: 8,
        hitPoints: 80,
        accuracy: 20,
        type: 'grenadier'
    }];

    $('<thead />').html('<th colspan="4" >SHOP</th>').appendTo($table);

    for (let i = 0, len = constants.LENGTH_SHOP_ITEMS; i < len; i += 1) {
        if ((i !== 0 && i % 4 === 0)) {
            $table.append($row.clone());
            $row.html('');
        }

        if (forUser.level >= arrImages[i].requiredLvl) {
            let $div = $('<div />').addClass('hide');
            $('<table />')
                .append($('<tr/>')
                    .append($('<td>Price:<td/><td>$' + arrImages[i].price + '</td>')))
                .append($('<tr/>')
                    .append($('<td>Damage:<td/><td>' + arrImages[i].damage + '</td>')))
                .append($('<tr/>')
                    .append($('<td>Defence:<td/><td>' + arrImages[i].defence + '</td>')))
                .append($('<tr/>')
                    .append($('<td>Health:<td/><td>' + arrImages[i].hitPoints + '</td>')))
                .append($('<tr/>')
                    .append($('<td>Accuracy:<td/><td>' + arrImages[i].accuracy + '</td>')))
                .appendTo($div);

            $('<td />')
                .addClass('jqui')
                .attr('data-type', arrImages[i].type)
                .append($('<img />')
                    .attr('src', arrImages[i].imgPath)
                    .addClass('open'))
                .append($div.clone())
                .appendTo($row);

            $div.html('');
        } else {
            $('<td />')
                .append($('<img />')
                    .attr('src', lockedPath))
                .addClass('locked')
                .appendTo($row);
        }

        if (i === len - 1) {
            $table.append($row.clone());
            $row.html('');
        }
    }

    $('<main id="shop" />')
        .css('left', ((window.innerWidth / 2) - 400) + 'px')
        .css('top', ((window.innerHeight / 2) - 200) + 'px')
        .append($table)
        .append($('<input id="buy-soldiers" type="button" value="BUY" disabled="disabled"/>').prop('disabled', true))
        .appendTo('body');

    $('#shop').on('mouseover', 'img.open', function () {
        let parent = $(this).parent();
        parent.find('div.hide')
            .removeClass('hide')
            .addClass('soldier-info');
    });

    $('#shop').on('mouseout', 'img.open', function () {
        let parent = $(this).parent();
        parent.find('div.soldier-info')
            .removeClass('soldier-info')
            .addClass('hide');
    });

    $('main#shop table').on('click', function() {
        if (hasSelectedSoldier()) {
            $('#buy-soldiers').prop('disabled', false);
        } else {
            $('#buy-soldiers').prop('disabled', true);
        }
    }).selectable({
        filter: 'td.jqui'
    });

    function hasSelectedSoldier() {
        let collection = $('main#shop table').find('.ui-selected');
        if (collection.length) {
        	return true;
        }
        return false;
    }
}

export default {
    loadShop
}