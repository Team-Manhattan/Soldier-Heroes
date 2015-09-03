function log() {
    "use strict";

    $('body').html('');

    var width = window.innerWidth - 0;
    var height = window.innerHeight - 0;
    var $div = $('<div/>');
    var $form = $('<form />');
    // $div.attr('id', 'login-form');
    $div.attr('class', 'container');
    $form.attr('class', 'form-signin');

    // $('<div class="container"/>');
    // $('<img class="img-responsive" src="../Images/login-background.jpg" alt="Responsive image"/>').appendTo($div);
    $('<h2 />').attr('class','form-signin-heading').html('Login').appendTo($form);
    $('<label />').attr('for', 'username').attr('class','sr-only').html('Username').appendTo($form);
    $('<input type="text" placeholder="Username" class="form-control" id="username" required autofocus/>').appendTo($form);
    $('<label />').attr('for', 'password').attr('class','sr-only').html('Password:').appendTo($form);
    $('<input type="password" class="form-control" placeholder="Password" required/>').attr('id', 'password').appendTo($form);
    $('<input type="submit" id="login" class="btn btn-lg btn-primary btn-block" style="display: block" value="Sign in"/>').appendTo($form);
    $('<input type="submit" id="register" class="btn btn-lg btn-primary btn-block" style="display: none" value="Register"/>').appendTo($form);
    $('<a  href="#" id="forReg" />').html('Don\'t have an account? Register.').appendTo($form);
    $('<a  href="#" id="return-login" style="display: none"  />').html('Already registered? Sign in.').appendTo($form);
    $form.appendTo($div);
    $div.appendTo('body');

    

    $('#forReg').on('click', function () {
        $(this).css('display', 'none');
        $('#return-login').css('display','inline');
        $('#login').css('display', 'none');
        $('#register').css('display', 'block');
        $('div.container h2').html('Registration');
    });

    $('#return-login').on('click' ,function() {
        $(this).css('display', 'none');
        $('#forReg').css('display','inline');
        $('#login').css('display', 'block');
        $('#register').css('display', 'none');
        $('div.container h2').html('Login');
    });
    
    $('#login').on('click', function () {
        /*TODO:CHECK IN users db for existence of this user*/
        /*TODO:CHECK if the password matches*/
        /*TODO:Create object "player" with properties form gb data: money, exp, level, army etc.*/
        /*TODO:save id of the user in "localStarage" - it is special number six different digits*/
        /*TODO:Then Load on the shop menu*/
    });

    $('#register').on('click', function () {
        var username = $('#username').val();
        var password = $('#password').val();


        if (/\s+/.test(username) || /\s+/.test(password) || username === '' || password === '') {
            return;
            /*TODO:make more validations*/
            /*TODO:tell on user for the error*/
        }

        /*register new player in mongodb*/
        var mod = player.getPlayer();
        var pla = mod.createPlayer(username, password, 1, 1, 2000, new Date(), []);
        window.localStorage.setItem('loggedUser', pla.id);
        info.showLoggedUserInfo(pla);
        shop.loadShop(pla);
    });
}