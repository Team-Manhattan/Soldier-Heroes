import $ from 'jquery';
import loginForm from './loggingForm.js';

function showLoggedUserInfo(forUser) {
    "use strict";
    $('body').html('');
    let $table = $('<table />');
    let $row = $('<tr />');
    $('<td>Logged as:</td><td>' + forUser.namePl + '</td>').appendTo($row);
    $row.attr('id','userName');
    $table.append($row.clone());
    $row.html('');
    $('<td >Level:</td><td>' + forUser.level + '</td>').appendTo($row);
    $row.attr('id','lvl');
    $table.append($row.clone());
    $row.html('');
    $('<td >Money:</td><td>$' + forUser.money + '</td>').appendTo($row);
    $row.attr('id','money');
    $table.append($row.clone());
    $row.html('');
    $('<td >Exp:</td><td>' + forUser.exp + '</td>').appendTo($row);
    $row.attr('id','exp');
    $table.append($row.clone());
    $row.html('');

    $('<header id="logged-user-info"/>').append($table).appendTo('body');
    $('<input type="button" id="sign-out" value="Sign out">').appendTo('#logged-user-info');

    $('#sign-out').on('click', function () {
        window.localStorage.removeItem('loggedUser');
        loginForm.log();
    });
}

export default {
    showLoggedUserInfo
};
