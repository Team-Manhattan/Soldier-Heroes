function showLoggedUserInfo(forUser) {
    "use strict";
    $('body').html('');
    var $table = $('<table />');
    var $row = $('<tr />');
    $('<td>Logged as:</td><td>' + forUser.get("name") + '</td>').appendTo($row);
    $row.attr('id','userName');
    $table.append($row.clone());
    $row.html('');
    $('<td >Level:</td><td>' + forUser.get("level") + '</td>').appendTo($row);
    $row.attr('id','lvl');
    $table.append($row.clone());
    $row.html('');
    $('<td >Money:</td><td>$' + forUser.get("money") + '</td>').appendTo($row);
    $row.attr('id','money');
    $table.append($row.clone());
    $row.html('');
    $('<td >Exp:</td><td>' + forUser.get("exp") + '</td>').appendTo($row);
    $row.attr('id','exp');
    $table.append($row.clone());
    $row.html('');


    $('<header id="logged-user-info"/>').append($('<div/>').append($table)).appendTo('body');
    $('<input type="button" id="sign-out" value="Sign out">').appendTo('#logged-user-info div');

    $('#sign-out').on('click', function () {
        window.localStorage.removeItem('loggedUser');
        Parse.User.logOut();
        console.log("logged out");
        generateLoginForm();
    });
    
    return {
        showLoggedUserInfo: showLoggedUserInfo
    }
}