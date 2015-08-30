import $ from 'jquery';
import player from '../Libraries/player.js';
import info from './loadUserInfo.js';
import shop from './shop.js';

function log() {
    "use strict";

    $('body').html('');

    let width = window.innerWidth - 0;
    let height = window.innerHeight - 0;
    let $div = $('<div/>');
    let $form = $('<form />');
    // $div.attr('id', 'login-form');
    $div.attr('class', 'container');
    $form.attr('class', 'form-signin');

    $('<div class="container"/>');
    $('<h2 />').attr('class','form-signin-heading').html('Login').appendTo($form);
    $('<label />').attr('for', 'username').attr('class','sr-only').html('Username').appendTo($form);
    $('<input type="text" placeholder="Username" id="username" required autofocus/>').attr('class', 'form-control').appendTo($form);
    $('<label />').attr('for', 'password').attr('class','sr-only').html('Password:').appendTo($form);
    $('<input type="password" class="form-control" placeholder="Password" required/>').attr('id', 'password').appendTo($form);
    $('<input type="submit" id="login" class="btn btn-lg btn-primary btn-block" style="display: block" value="Sign in"/>').appendTo($form);
    $('<input type="submit" id="register" class="btn btn-lg btn-primary btn-block" style="display: none" value="Register"/>').appendTo($form);
    $('<a  href="#" id="forReg"/>').html('Don\'t have an account? Register.').appendTo($form);
    $('<a  href="#" id="return-login" style="display: none"  />').html('Already registered?').appendTo($form);
    $form.appendTo($div);
    $div.appendTo('body');

    $('#login').on('click', function () {
        /*TODO:CHECK IN users db for existence of this user*/
        /*TODO:CHECK if the password matches*/
        /*TODO:Create object "player" with properties form gb data: money, exp, level, army etc.*/
        /*TODO:save id of the user in "localStarage" - it is special number six different digits*/
        /*TODO:Then Load on the shop menu*/
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
        let pla = mod.createPlayer(username, password, 1, 1, 100, new Date(), []);
        window.localStorage.setItem('loggedUser', pla.id);
        info.showLoggedUserInfo(pla);
        shop.loadShop(pla);
    });
}

export default {
    log
}