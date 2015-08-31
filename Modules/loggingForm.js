import $ from 'jquery';
import player from '../Libraries/player.js';
import info from './loadUserInfo.js';
import shop from './shop.js';

function log() {
    "use strict";

    //$('body').html('');

    let width = window.innerWidth - 0;
    let height = window.innerHeight - 0;
    let $div = $('<div/>');
    $div.attr('id', 'login-form');

    $('<h3 />').html('Login').appendTo($div);
    $('<label />').attr('for', 'username').html('Username:').appendTo($div);
    $('<input type="text" id="username"/>').appendTo($div);
    $('<label />').attr('for', 'password').html('Password:').appendTo($div);
    $('<input type="password"/>').attr('id', 'password').appendTo($div);
    $('<input type="button" id="login" style="display: block" value="Sign in"/>').appendTo($div);
    $('<input type="button" id="register" style="display: none" value="Register" />').appendTo($div);
    $('<a  href="#" id="forReg"/>').html('Don\'t have an account? Register.').appendTo($div);
    $('<a  href="#" id="return-login" style="display: none"  />').html('Already registered?').appendTo($div);
    $div.attr('style', 'left: ' + ((width / 2) - 120) + 'px; top: ' + ((height / 2) - 75) + 'px;');
    $div.appendTo('body');

    $('#login').on('click', function () {
        let username = $('#username').val();
        let password = $('#password').val();
        $.ajax({
            url: '/login',
            type: 'POST',
            data: {
                username: username,
                password: password
            }
        })
        .done(function (res) {
            var newDoc = document.open("text/html", "replace");
            newDoc.write(res);
            newDoc.close();
        })
        .fail(function(res) {
            console.log(res);
        });
    });

    $('#forReg').on('click', function () {
        $(this).css('display', 'none');
        $('#return-login').css('display','inline');
        $('#login').css('display', 'none');
        $('#register').css('display', 'block');
        $('div#login-form h3').html('Registration');
    });

    $('#return-login').on('click' ,function() {
        $(this).css('display', 'none');
        $('#forReg').css('display','inline');
        $('#login').css('display', 'block');
        $('#register').css('display', 'none');
        $('div#login-form h3').html('Login');
    });

    $('#register').on('click', function () {
        let username = $('#username').val();
        let password = $('#password').val();


        if (/\s+/.test(username) || /\s+/.test(password) || username === '' || password === '') {
            return;
            /*TODO:make more validations*/
            /*TODO:tell on user for the error*/
        }

        /*register new player in mongodb*/
        let mod = player.getPlayer();
        /*let pla = mod.createPlayer(username, password, 1, 1, 100, new Date(), []);
        window.localStorage.setItem('loggedUser', pla.id);
        info.showLoggedUserInfo(pla);
        shop.loadShop(pla);*/
        $.ajax({
            url: '/register',
            type: 'POST',
            data: {
                username: username,
                password: password
            }
        })
        .done(function(res) {
            console.log(res);
            if (res.username) {
                info.showLoggedUserInfo(res);
                shop.loadShop(res);
            } else {
                alert('could not register');
            }
        })
        .fail(function() {
            alert('AJAX FAILED');
        });

    });
}

export default {
    log
}
