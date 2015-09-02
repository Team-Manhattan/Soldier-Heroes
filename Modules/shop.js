import $ from 'jquery';
import constants from '../Libraries/constants.js';
import '../Libraries/External/jquery-ui.js';
import generateSoldier from '../Soldiers/createSoldierOfType.js';

function loadShop(forUser) {
    "use strict";
    let $table = $('<table cellspacing="0" cellpadding="0"/>');
    let $divPlayerArmy = $('<div />');
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

    $divPlayerArmy
        .attr('id', 'container-army')
        .append($('<p />').html('Your army'))
        .append($('<ul />').attr('id', 'player-army'))
        .append($('<input id="start-battle" type="button" value="START" />').prop('disabled', true));

    $('<main id="shop" />')
        .css('right', '100px')
        .css('top', '150px')
        .append($table)
        .append($('<input id="buy-soldiers" type="button" value="BUY" />').prop('disabled', true))
        .append($divPlayerArmy)
        .appendTo('body');

    $('body').on('mouseover', '#shop img.open', function () {
        let parent = $(this).parent();
        parent.find('div.hide')
            .removeClass('hide')
            .addClass('soldier-info');
    });

    $('body').on('mouseout', '#shop img.open', function () {
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

    $('body').on('click', '#buy-soldiers', function () {
        let $fragment = $(document.createDocumentFragment());
        let $selectedSoldiersFromShop = $('.ui-selected');
        let len = $selectedSoldiersFromShop.length;
        let armyToTransfer = [];
        let sum = 0;
        for (let i = 0; i < len; i += 1) {
            let dataType = $selectedSoldiersFromShop[i].attributes['data-type'];
            let soldierType = $(dataType).val();
            let soldier = generateSoldier.createSoldierByType(soldierType);
            let backgroundImageLink = soldier.image;
            armyToTransfer.push(soldier);
            sum += soldier.price;
            $('<li />')
                .css('background-image', 'url("../' + backgroundImageLink + '")')
                .appendTo($fragment);

        }
        if (forUser.army.length >= constants.MAX_ARMY_LENGTH) {
            showError(`Your army is full! Max soldiers ${constants.MAX_ARMY_LENGTH}`);
        } else if (sum > forUser.money) {
            showError(`Not enough money! Need more $ + ${sum - forUser.money}`);
        } else {
            $('#player-army').append($fragment);
            $('#start-battle').prop('disabled', false);
            forUser.money -= sum;
            armyToTransfer.forEach(function(item) {
                    forUser.army.push(item);
            });

            $('#money td:last-of-type').html('$' + forUser.money);
        }

    });

    function hasSelectedSoldier() {
        let collection = $('main#shop table').find('.ui-selected');
        if (collection.length) {
            return true;
        }
        return false;
    }

    function showError(errMessage) {
        let error = $('<p>' + errMessage + ' </p>');
        error.addClass('error-message')
            .insertAfter('#buy-soldiers')
            .fadeIn(500)
            .fadeOut(2000, function () {
                console.log(this);
                $(this).remove();
            });
    }
}

export default {
    loadShop
}