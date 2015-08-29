import $ from 'jquery';
import player from './player.js';

function log() {
    "use strict";

    $('body').html('');

    let width = window.innerWidth - 0;
    let height = window.innerHeight - 0;
    console.log(width);
    console.log(height);
    let $div = $('<div/>');
    $div.attr('id', 'login-form');

    $('<h3 />').html('Login').appendTo($div);
    $('<label />').attr('for', 'username').html('Username:').appendTo($div);
    $('<input type="text" id="username"/>').appendTo($div);
    $('<label />').attr('for', 'password').html('Password:').appendTo($div);
    $('<input type="password"/>').attr('id', 'password').appendTo($div);
    $('<input type="button" id="login" style="display: block" value="Sign in"/>').appendTo($div);
    $('<input type="button" id="register" style="display: none" value="Register" />').appendTo($div);
    $('<a  href="#" id="forReg" />').html('Don\'t have an account? Register.').appendTo($div);
    $div.attr('style', 'left: ' + ((width / 2) - 120) + 'px; top: ' + ((height / 2) - 75) + 'px;');
    $div.appendTo('body');

    $('#login').on('click', function () {
        /*TODO:CHECK IN users db for existence of this user*/
        /*TODO:CHECK if the password matches*/
        /*TODO:Create object "player" with properties form gb data: money, exp, level, army etc.*/
        /*TODO:save id of the user in "localStarage" - it is special number four different digits*/
        /*TODO:Then Load on the shop menu*/
    });

    $('#forReg').on('click', function () {
        $(this).css('display', 'none');
        $('#login').css('display', 'none');
        $('#register').css('display', 'block');
        $('div#login-form h3').html('Registration');
    });

    $('#register').on('click', function () {
        let username = $('#username').val();
        let password = $('#password').val();

        /*Todo: Show signed as player.username*/

        if (/\s+/.test(username) || /\s+/.test(password) || username === '' || password === '') {
            return;
            /*TODO:make more validations*/
            /*TODO:tell on user for the error*/
        }

        /*register new player in mongodb*/
        let mod = player.bigPlayer();
        let pla = mod.getPlayer(username, password, 1, 1, 100, new Date(), []);
        window.localStorage.setItem(pla.namePl, pla.id);

        // this must be in second module
        $('#login-form').remove();
        $('<header />').html(`Signed as ${username}!`).appendTo('body');
    });
}

export default {
    log: log
}