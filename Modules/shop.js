/*globals $ */
function loadShop(forUser) {
    "use strict";
    var $table = $('<table cellspacing="0" cellpadding="0"/>');
    var $divPlayerArmy = $('<div />');
    var $row = $('<tr />');
    var lockedPath = 'Images/locked.png';
    var soldiersInShop = [
        createSoldierByType(constants.medic),
        createSoldierByType(constants.pistol),
        createSoldierByType(constants.assaultRifle),
        createSoldierByType(constants.sniper),
        createSoldierByType(constants.grenadier),
        createSoldierByType(constants.grenadier),
        createSoldierByType(constants.grenadier),
        createSoldierByType(constants.grenadier),
        createSoldierByType(constants.grenadier),
        createSoldierByType(constants.grenadier),
        createSoldierByType(constants.grenadier),
        createSoldierByType(constants.grenadier)
    ];

    $('<thead />').html('<th colspan="4" >SHOP</th>').appendTo($table);

    for (var i = 0, len = constants.LENGTH_SHOP_ITEMS; i < len; i += 1) {
        if ((i !== 0 && i % 4 === 0)) {
            $table.append($row.clone());
            $row.html('');
        }

        if (forUser.get("level") >= soldiersInShop[i].requiredLvl) {
            var $div = $('<div />').addClass('hide');
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

    if (forUser.get("army").length) {
        loadArmy(forUser.get("army"));
    }

    $('body').on('mouseover', '#shop img.open', function () {
        var parent = $(this).parent();
        parent.find('div.hide')
            .removeClass('hide')
            .addClass('soldier-info');
    });

    $('body').on('mouseout', '#shop img.open', function () {
        var parent = $(this).parent();
        parent.find('div.soldier-info')
            .removeClass('soldier-info')
            .addClass('hide');
    });

    /*jquery ui selectable*/
    $('main#shop table').on('click', function () {
        if (hasSelectedSoldier()) {
            $('#buy-soldiers').prop('disabled', false);
        } else {
            $('#buy-soldiers').prop('disabled', true);
        }
    }).selectable({
        filter: 'td.jqui'
    });

    /*jquery ui sortable*/
    $('div#container-army ul#player-army')
        .sortable({
            placeholder: "ui-state-highlight"
        })
        .disableSelection();

    $('body').on('click', '#buy-soldiers', function () {
        var $fragment = $(document.createDocumentFragment());
        var $selectedSoldiersFromShop = $('.ui-selected');
        var len = $selectedSoldiersFromShop.length;
        var armyToTransfer = [];
        var sum = 0;
        for (var i = 0; i < len; i += 1) {
            var dataType = $selectedSoldiersFromShop[i].attributes['data-type'];
            var soldierType = $(dataType).val();
            var soldier = createSoldierByType(soldierType);
            var backgroundImageLink = soldier.image;
            armyToTransfer.push(soldier);
            sum += soldier.price;
            $('<li />')
                .addClass('ui-state-default')
                .css('background-image', 'url("../' + backgroundImageLink + '")')
                .appendTo($fragment);
        }

        if (forUser.get("army").length > constants.MAX_ARMY_LENGTH) {
        	showError(`Your army can be with length ${constants.MAX_ARMY_LENGTH}!`);
        } else if (forUser.get("level").length >= constants.MAX_ARMY_LENGTH) {
            showError(`Your army is full! Max soldiers ${constants.MAX_ARMY_LENGTH}`);
        } else if (sum > forUser.get("money")) {
            showError(`Not enough money! Need more $ + ${sum - forUser.get("money")}.`);
        } else {
            $('#player-army').append($fragment);
            $('#start-battle').prop('disabled', false);
            forUser.set("money", forUser.get("money") - sum);
            armyToTransfer.forEach(function(item) {
                    //var updatedArmy =  forUser.get("army").push(item);
                    //forUser.set("army", updatedArmy);
                    var army = forUser.get("army");
                    army.push(item);
                    console.log(army);
            });
            $('div#container-army p').html('YOUR ARMY ' + forUser.get("army").length);
            $('#money td:last-of-type').html('$' + forUser.get("money"));
        }
        
        forUser.save()
            .then(function(){
                
            }, function(err){
                console.log("Error:" + JSON.stringify(err));
            });

    });

    function hasSelectedSoldier() {
        var collection = $('main#shop table').find('.ui-selected');
        if (collection.length) {
            return true;
        }
        return false;
    }

    function loadArmy(soldiers) {
        var i,
            len = soldiers.length,
            $fragment = $(document.createDocumentFragment());

        for (i = 0; i < len; i += 1) {
            $('<li />')
                .addClass('ui-state-default')
                .css('background-image', 'url("../' + soldiers[i]._image + '")')
                .appendTo($fragment);
        }
        $('#player-army').append($fragment);
    }

    function showError(errMessage) {
        var error = $('<p>' + errMessage + ' </p>');
        error.addClass('error-message')
            .insertAfter('#buy-soldiers')
            .fadeIn(500)
            .fadeOut(2000, function () {
                //console.log(this);
                $(this).remove();
            });
    }
}