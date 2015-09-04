$("body").on("click", "#start-battle", function(){
	var enemyArmy = AI.generateEnemyArmy(Parse.User.current()),
		userArmy = Parse.User.current().get("army"),
		roundCounter = 0;

	loadArmy(enemyArmy, '#enemy-army');
	loadArmy(userArmy, '#player-army');
	
	while(userArmy.length > 0 && enemyArmy.length > 0){
		if(roundCounter > 1000){
			break;
		}
		// Pistols
		battleHandler.attackWithUserPistols(userArmy, enemyArmy);
		battleHandler.attackWithUserPistols(enemyArmy, userArmy);
		
		// AssaultRifles
		battleHandler.attackWithUserAssaultRifles(userArmy, enemyArmy);
		battleHandler.attackWithUserAssaultRifles(enemyArmy, userArmy);
		
		// Snipers
		battleHandler.attackWithUserSnipers(userArmy, enemyArmy);
		battleHandler.attackWithUserSnipers(enemyArmy, userArmy);
		
		// Medics
		battleHandler.healWithUserMedics(userArmy);
		battleHandler.healWithUserMedics(enemyArmy);
		
		userArmy = battleHandler.removeDeadSoldiers(userArmy);
		enemyArmy = battleHandler.removeDeadSoldiers(enemyArmy);
		
		roundCounter += 1;
	}
	
	Parse.User.current().set("army", battleHandler.removeDeadSoldiers(userArmy));
	Parse.User.current().save();
	
	if(roundCounter > 1000){
		alert("Draw!\nYou get nothing because you can't even defeat the computer.");
	}
	else if(enemyArmy.length == 0){
		var award = battleHandler.awardUser(Parse.User.current());
		alert("You won!\nExp: " + award.exp + "\nMoney:" + award.money);
		level.checkLevelUp(Parse.User.current());
		updateUserInfo(Parse.User.current());
	}
	else {
		var award = battleHandler.punishUser(Parse.User.current());
		alert("You LOST!\nLost Exp: " + award.exp + "\nLost Money:" + award.money);
		updateUserInfo(Parse.User.current());
	}
});