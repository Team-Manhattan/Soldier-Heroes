import $ from 'jquery';
import constants from '../Libraries/constants.js';
import '../Libraries/External/jquery-ui.js';
import generateSoldier from '../Soldiers/createSoldierOfType.js';

function loadShop(forUser) {
    "use strict";
    let $table = $('<table cellspacing="0" cellpadding="0"/>');
    let $row = $('<tr />');
    let lockedPath = 'Images/locked.png';
    let soldiersInShop = [
        generateSoldier.createSoldierByType(constants.medic),
        generateSoldier.createSoldierByType(constants.pistol),
        generateSoldier.createSoldierByType(constants.assaultRifle),
        generateSoldier.createSoldierByType(constants.sniper),
        generateSoldier.createSoldierByType(constants.grenadier),
        generateSoldier.createSoldierByType(constants.grenadier),
        generateSoldier.createSoldierByType(constants.grenadier),
        generateSoldier.createSoldierByType(constants.grenadier),
        generateSoldier.createSoldierByType(constants.grenadier),
        generateSoldier.createSoldierByType(constants.grenadier),
        generateSoldier.createSoldierByType(constants.grenadier),
        generateSoldier.createSoldierByType(constants.grenadier)
    ];

    $('<thead />').html('<th colspan="4" >SHOP</th>').appendTo($table);

    for (let i = 0, len = constants.LENGTH_SHOP_ITEMS; i < len; i += 1) {
        if ((i !== 0 && i % 4 === 0)) {
            $table.append($row.clone());
            $row.html('');
        }

        console.log(soldiersInShop[i].typeOfSoldier);

        if (forUser.level >= soldiersInShop[i].requiredLvl) {
            let $div = $('<div />').addClass('hide');
            $('<table />')
                .append($('<tr/>')
                    .append($('<td>Price:<td/><td>$' + soldiersInShop[i].price + '</td>')))
                .append($('<tr/>')
                    .append($('<td>Damage:<td/><td>' + soldiersInShop[i].damage + '</td>')))
                .append($('<tr/>')
                    .append($('<td>Defence:<td/><td>' + soldiersInShop[i].defence + '</td>')))
                .append($('<tr/>')
                    .append($('<td>Health:<td/><td>' + soldiersInShop[i].hitPoints + '</td>')))
                .append($('<tr/>')
                    .append($('<td>Accuracy:<td/><td>' + soldiersInShop[i].accuracy + '</td>')))
                .appendTo($div);

            $('<td />')
                .addClass('jqui')
                .attr('data-type', soldiersInShop[i].typeOfSoldier)
                .append($('<img />')
                    .attr('src', soldiersInShop[i].image)
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

    $('main#shop table').on('click', function () {
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

    $('#buy-soldiers').on('click', function () {

    });
}

export default {
    loadShop
}