function generateLoginForm(){
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
	
	
	var loginButton = document.getElementById('login'),
		registerButton = document.getElementById('register');
	
	loginButton.addEventListener('click', function(ev){
		var userName = document.getElementById('username').value,
			password = document.getElementById('password').value;
			
		Parse.User.logIn(userName, password)
			.then(function(){
				var user = Parse.User.current();
				
				window.localStorage.setItem('loggedUser', user.id);
				showLoggedUserInfo(user);
				loadShop(user);
				
				alert("User logged in successfully.");
			}, function(err){
				alert("Invalid username and password combination");
			});
		console.log(userName,password);
	}, false);
	
	
	
	registerButton.addEventListener('click', function(ev){
		var userName = document.getElementById('username').value,
			password = document.getElementById('password').value;
			
		Parse.User.signUp(userName, password)
			.then(function(){
				var user = Parse.User.current();
				var theNewPlayer = getPlayer.createPlayer(userName,
					password,
					constants.DEFAULT_LEVEL,
					constants.DEFAULT_EXP,
					constants.DEFAULT_MONEY,
					new Date(),
					constants.DEFAULT_ARMY);

				user.set("army", theNewPlayer.army);
				user.set("level", theNewPlayer.level);
				user.set("exp", theNewPlayer.exp);
				user.set("money", theNewPlayer.money);
				user.set("name", theNewPlayer.namePl);
				user.save();
				
				window.localStorage.setItem('loggedUser', user.id);
				showLoggedUserInfo(user);
				loadShop(user);
				
				alert('User created successfully');
			}, function(err){
				alert("Error: " + JSON.stringify(err));
			});
	}, false);
}
if(localStorage.getItem("loggedUser")){
	var user = Parse.User.current();
	
	showLoggedUserInfo(user);
	loadShop(user);
}
else {
	generateLoginForm();
}